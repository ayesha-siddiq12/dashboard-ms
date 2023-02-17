import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SacAttendanceComponent } from './sac-attendance.component';

const routes: Routes = [
  {
    path:'',
    component: SacAttendanceComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SacAttendanceRoutingModule { }
