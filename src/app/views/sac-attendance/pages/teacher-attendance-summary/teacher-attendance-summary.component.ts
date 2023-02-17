import { Component, OnInit, ViewChild } from '@angular/core';
import { TasAverageAttendanceComponent } from './reports/tas-average-attendance/tas-average-attendance.component';

@Component({
  selector: 'app-teacher-attendance-summary',
  templateUrl: './teacher-attendance-summary.component.html',
  styleUrls: ['./teacher-attendance-summary.component.scss']
})
export class TeacherAttendanceSummaryComponent implements OnInit {

  bigNumberReports: any = [];
  maxDate: any;
  minDate: any;
  startDate: any;
  endDate: any

  @ViewChild('averageAttendance') averageAttendance:TasAverageAttendanceComponent;
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
      this.averageAttendance?.getReportData(this.startDate, this.endDate);
    }
  }

}
