import { Component, OnInit } from '@angular/core';
import { getBarDatasetConfig, getChartJSConfig } from 'src/app/core/config/ChartjsConfig';
import { CommonService } from 'src/app/core/services/common/common.service';
import { RbacService } from 'src/app/core/services/rbac-service.service';
import { WrapperService } from 'src/app/core/services/wrapper.service';
import { formatNumberForReport } from 'src/app/utilities/NumberFomatter';
import { buildQuery, parseTimeSeriesQuery } from 'src/app/utilities/QueryBuilder';
import { config } from 'src/app/views/sac-attendance/config/sac_attendance_config';

@Component({
  selector: 'app-grade-wise-average-attendance',
  templateUrl: './grade-wise-average-attendance.component.html',
  styleUrls: ['./grade-wise-average-attendance.component.scss']
})
export class GradeWiseAverageAttendanceComponent implements OnInit {

  title: any;
  chartHeight: any;
  marginTop: any;
  config;
  data;
  fileName: string = "Grade Wise Average Attendance";
  reportName: string = 'sas_grade_wise_average_attendance';
  filters: any = [];
  levels: any;
  tableReportData: any;
  startDate: any;
  endDate: any;
  minDate: any;
  maxDate: any;
  filterIndex: any;
  currentHierarchyLevel: any = 1;
  rbacDetails: any;

  constructor(private readonly _commonService: CommonService, private readonly _wrapperService: WrapperService, private _rbacService: RbacService) { 
    this._rbacService.getRbacDetails().subscribe((rbacDetails: any) => {
      this.rbacDetails = rbacDetails;
    })
  }

  ngOnInit(): void {
    this.getReportData();
  }

  async getReportData(startDate = undefined, endDate = undefined): Promise<void> {
    this.startDate = startDate;
    this.endDate = endDate;
    let reportConfig = config

    let { timeSeriesQueries, queries, levels, defaultLevel, filters, options } = reportConfig[this.reportName];
    let onLoadQuery;

    if (this.rbacDetails?.role) {
      filters.every((filter: any) => {
        if (Number(this.rbacDetails?.role) === Number(filter.hierarchyLevel)) {
          queries = filter?.actions?.queries
          timeSeriesQueries = filter?.timeSeriesQueries
          Object.keys(queries).forEach((key) => {
            queries[key] = this.parseRbacFilter(queries[key])
            timeSeriesQueries[key] = this.parseRbacFilter(timeSeriesQueries[key])
          });
          return false
        }
        return true
      })
    }
    else {
      this._wrapperService.constructFilters(this.filters, filters);
    }

    Object.keys(queries).forEach((key: any) => {
      if (this.startDate !== undefined && this.endDate !== undefined && Object.keys(timeSeriesQueries).length > 0) {
        onLoadQuery = parseTimeSeriesQuery(timeSeriesQueries[key], this.startDate, this.endDate)
      }
      else {
        onLoadQuery = queries[key]
      }
      let query = buildQuery(onLoadQuery, defaultLevel, this.levels, this.filters, this.startDate, this.endDate, key);

      if (query && key === 'barChart') {
        this.getBarChartReportData(query, options, filters, defaultLevel);
      }


    })
  }

  getBarChartReportData(query, options, filters, defaultLevel): void {
    this._commonService.getReportDataNew(query).subscribe((res: any) => {
      let rows = res;
      let { barChart: { yAxis, xAxis } } = options;
      rows.forEach(row => {
        if (this.minDate !== undefined && this.maxDate !== undefined) {
          if (row['min_date'] < this.minDate) {
            this.minDate = row['min_date']
          }
          if (row['max_date'] > this.maxDate) {
            this.maxDate = row['max_date']
          }
        }
        else {
          this.minDate = row['min_date']
          this.maxDate = row['max_date']
        }
      });
      this.tableReportData = {
        values: rows
      }
      console.log(this.tableReportData)
      this.config = getChartJSConfig({
        labelExpr: yAxis.value,
        datasets: getBarDatasetConfig(xAxis?.metrics?.map((metric: any) => {
          return {
            dataExpr: metric.value, label: metric.label
          }
        })),
        options: {
          height: (rows.length * 15 + 150).toString(),
          tooltips: {
            callbacks: {
              label: (tooltipItem, data) => {
                let multistringText = [];
                if (tooltipItem.datasetIndex === 0) {
                  xAxis.metrics.forEach((metric: any) => {
                    multistringText.push(`${metric.label}: ${formatNumberForReport(rows[tooltipItem.index][metric.value])}`);
                  });
                }

                return multistringText;
              }
            }
          },
          scales: {
            yAxes: [{
              scaleLabel: {
                display: true,
                labelString: yAxis.title !== 'level' ? yAxis.title : this.getYaxisTitle(filters) ? this.getYaxisTitle(filters) : defaultLevel
              }
            }],
            xAxes: [{
              scaleLabel: {
                display: true,
                labelString: xAxis.title
              }
            }]
          }
        }
      });
    });
  }

  async filtersUpdated(filters: any): Promise<void> {
    await new Promise(r => setTimeout(r, 100));
    console.log(filters)
    this.filters = [...filters]
    let tempLevel = 1;
    filters.forEach((filter: any) => {
      tempLevel = Number(filter.hierarchyLevel) + 1 > Number(tempLevel) ? Number(filter.hierarchyLevel) + 1 : Number(tempLevel);
    })
    this.currentHierarchyLevel = tempLevel;
    this.getReportData();
  }

  timeSeriesUpdated(event: any): void {
    this.startDate = event?.startDate?.toDate().toISOString().split('T')[0]
    this.endDate = event?.endDate?.toDate().toISOString().split('T')[0]
    this.getReportData();
  }

  parseRbacFilter(query: string) {
    let newQuery = query;
    let startIndex = newQuery?.indexOf('{');
    let endIndex = newQuery?.indexOf('}');

    if (newQuery && startIndex > -1) {
      let propertyName = query.substring(startIndex + 1, endIndex);
      let re = new RegExp(`{${propertyName}}`, "g");
      Object.keys(this.rbacDetails).forEach((key: any) => {
        if (propertyName === key + '_id') {
          newQuery = newQuery.replace(re, '\'' + this.rbacDetails[key] + '\'');
        }
      });
    }
    return newQuery
  }

  getYaxisTitle(filters: any): string {
    let title: string;
    console.log(this.currentHierarchyLevel)
    filters.forEach((filter: any) => {
      if (Number(filter.hierarchyLevel) === this.currentHierarchyLevel - 1) {
        title = filter?.actions?.level;
        console.log(title)
      }
    });
    return title;
  }

}
