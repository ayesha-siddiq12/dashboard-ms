import { Component, OnInit, ViewChild } from '@angular/core';
import { SacAverageAtendanceComplianceComponent } from './reports/sac-average-atendance-compliance/sac-average-atendance-compliance.component';

@Component({
  selector: 'app-student-attendance-compliance',
  templateUrl: './student-attendance-compliance.component.html',
  styleUrls: ['./student-attendance-compliance.component.scss']
})
export class StudentAttendanceComplianceComponent implements OnInit {

  bigNumberReports: any = [];
  maxDate: any;
  minDate: any;
  startDate: any;
  endDate: any

  @ViewChild('averageAttendanceCompliance') averageAttendanceCompliance: SacAverageAtendanceComplianceComponent;
  constructor() { }

  ngOnInit(): void {
  }

  appendBigNumber(bigNumberData: any) {
    this.bigNumberReports.push(bigNumberData)
  }

  settimeSeriesDates(dates: any) {
    this.minDate = (this.minDate === undefined || (dates?.minDate && this.minDate < dates.minDate)) ? dates?.minDate : this.minDate
    this.maxDate = (this.maxDate === undefined || (dates?.maxDate && this.maxDate > dates.maxDate)) ? dates.maxDate : this.maxDate
  }

  timeSeriesUpdated(event: any): void {
    this.startDate = event?.startDate?.toDate().toISOString().split('T')[0]
    this.endDate = event?.endDate?.toDate().toISOString().split('T')[0]
    if (event?.startDate !== null && event?.endDate !== null) {
      this.averageAttendanceCompliance?.getReportData(this.startDate, this.endDate);
    }
  }

}
