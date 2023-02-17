import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { TacAverageAtendanceComplianceComponent } from './reports/tac-average-atendance-compliance/tac-average-atendance-compliance.component';


@Component({
  selector: 'app-teacher-attendance-compliance',
  templateUrl: './teacher-attendance-compliance.component.html',
  styleUrls: ['./teacher-attendance-compliance.component.scss']
})
export class TeacherAttendanceComplianceComponent implements OnInit  {

  bigNumberReports: any = [];
  maxDate: any;
  minDate: any;
  startDate: any;
  endDate: any;

  @ViewChild('averageAttendanceCompliance') averageAttendanceCompliance:TacAverageAtendanceComplianceComponent;
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
