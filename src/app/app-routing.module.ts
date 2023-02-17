import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './core/components/layout/layout.component';
import { RbacDialogComponent } from './shared/components/rbac-dialog/rbac-dialog.component';
import { HomePageComponent } from './views/home-page/home-page.component';

var routes: Routes = [];


  routes = [
    {
      path: '', redirectTo: `home`, pathMatch: 'full'
    },
    {
      path: 'rbac', component: RbacDialogComponent
    },
    {
      path: 'home', component: HomePageComponent
    },
    {
      path: '',
      component: LayoutComponent,
      children: [
        {
          path: '',
          redirectTo: 'dashboard',
          pathMatch: 'full',
        },
        {
          path: 'dashboard',
          loadChildren: () =>
            import('./views/dashboard/dashboard.module').then(
              (module) => module.DashboardModule
            ),
        },
        // {
        //   path: 'attendance',
        //   loadChildren: () =>
        //     import('./views/attendance/attendance.module').then(
        //       (module) => module.AttendanceModule
        //     ),
        // },
        // {
        //   path: 'attendance/sac',
        //   loadChildren: () =>
        //     import('./views/Attendance/pages/student-attendance-compliance/student-attendance-compliance.module').then(
        //       (module) => module.StudentAttendanceComplianceModule
        //     )
        // },
        // {
        //   path: 'attendance/tac',
        //   loadChildren: () =>
        //     import('./views/Attendance/pages/teacher-attendance-compliance/teacher-attendance-compliance.module').then(
        //       (module) => module.TeacherAttendanceComplianceModule
        //     )
        // },
        // {
        //   path: 'attendance/sas',
        //   loadChildren: () =>
        //     import('./views/Attendance/pages/student-attendance-summary/student-attendance-summary.module').then(
        //       (module) => module.StudentAttendanceSummaryModule
        //     )
        // },
        // {
        //   path: 'attendance/tas',
        //   loadChildren: () =>
        //     import('./views/Attendance/pages/teacher-attendance-summary/teacher-attendance-summary.module').then(
        //       (module) => module.TeacherAttendanceSummaryModule
        //     )
        // },
        {
          path: 'sac-attendance',
          loadChildren: () => 
            import('./views/sac-attendance/sac-attendance.module').then(
              (module) => module.SacAttendanceModule
            )
        }
      ],
    },
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
