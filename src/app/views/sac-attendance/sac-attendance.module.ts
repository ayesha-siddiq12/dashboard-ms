import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';

import { SacAttendanceRoutingModule } from './sac-attendance-routing.module';
import { StudentAttendanceSummaryComponent } from './pages/student-attendance-summary/student-attendance-summary.component';
import { TeacherAttendanceSummaryComponent } from './pages/teacher-attendance-summary/teacher-attendance-summary.component';
import { TeacherAttendanceComplianceComponent } from './pages/teacher-attendance-compliance/teacher-attendance-compliance.component';
import { GenderWiseAverageAttendanceComponent } from './pages/student-attendance-summary/reports/gender-wise-average-attendance/gender-wise-average-attendance.component';
import { GradeWiseAverageAttendanceComponent } from './pages/student-attendance-summary/reports/grade-wise-average-attendance/grade-wise-average-attendance.component';
import { SacAverageAtendanceComplianceComponent } from './pages/student-attendance-compliance/reports/sac-average-atendance-compliance/sac-average-atendance-compliance.component';
import { TacAverageAtendanceComplianceComponent } from './pages/teacher-attendance-compliance/reports/tac-average-atendance-compliance/tac-average-atendance-compliance.component';
import { SasAverageAttendanceComponent } from './pages/student-attendance-summary/reports/sas-average-attendance/sas-average-attendance.component';
import { TasAverageAttendanceComponent } from './pages/teacher-attendance-summary/reports/tas-average-attendance/tas-average-attendance.component';
import { StudentAttendanceComplianceComponent } from './pages/student-attendance-compliance/student-attendance-compliance.component';
import { SacAttendanceComponent } from './sac-attendance.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashletModule } from '@project-sunbird/sb-dashlet-v14';
import { DataService } from 'src/app/core/services/data.service';


@NgModule({
  declarations: [
    SacAttendanceComponent,
    StudentAttendanceComplianceComponent,
    StudentAttendanceSummaryComponent,
    TeacherAttendanceSummaryComponent,
    TeacherAttendanceComplianceComponent,
    GenderWiseAverageAttendanceComponent,
    GradeWiseAverageAttendanceComponent,
    SacAverageAtendanceComplianceComponent,
    TacAverageAtendanceComplianceComponent,
    SasAverageAttendanceComponent,
    TasAverageAttendanceComponent
  ],
  imports: [
    DashletModule.forRoot({
      dataService: DataService
    }),
    SharedModule,
    MatTabsModule,
    CommonModule,
    SacAttendanceRoutingModule
  ]
})
export class SacAttendanceModule { }
