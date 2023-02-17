import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/core/services/common/common.service';
import { RbacService } from 'src/app/core/services/rbac-service.service';
import { rbacConfig } from './rbacConfig';

@Component({
  selector: 'app-rbac-dialog',
  templateUrl: './rbac-dialog.component.html',
  styleUrls: ['./rbac-dialog.component.scss']
})
export class RbacDialogComponent implements OnInit {
  rbacForm: FormGroup;
  filters: any = [];
  selectedRoleLevel: any = 0;
  rbacRoles: any = rbacConfig.roles


  constructor(private fb: FormBuilder, private _commonService: CommonService, private _rbacService: RbacService, private router: Router) { }

  ngOnInit(): void {
    this.rbacForm = this.fb.group({
      name: [null, Validators.required],
      role: [null, Validators.required],
      state: [null],
      district: [null],
      block: [null],
      cluster: [null],
      school: [null]
    })
  }

  get f() {
    return this.rbacForm.controls;
  }

  onSubmit() {
    const invalid = [];
    const controls = this.rbacForm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
      }
    }
    console.log(invalid)
    if (this.rbacForm.valid) {
      this._rbacService.setRbacDetails(this.rbacForm.value);
      this.router.navigate(['/dashboard'])
    }
    else {
      this.rbacForm.markAllAsTouched()
    }
  }

  onRoleSelect(roleLevel: any) {
    this.selectedRoleLevel = roleLevel;
    this.filters = [];
    this.resetFilterForm(this.rbacForm);
    this.getFilters();
  }

  async getFilters() {
    if (this.selectedRoleLevel === 0) {
      this.filters = [];
      const controls = this.rbacForm.controls;
      for (const name in controls) {
        console.log(name)
        if (name !== 'name' && name !== 'role') {
          controls[name].clearValidators()
          controls[name].updateValueAndValidity()
        }
      }
      return
    }
    let { filters, baseHierarchy } = rbacConfig;
    let oldFilters = this.filters.filter((filter: any) => {
      return this.rbacForm.value[filter.name?.toLowerCase()] != null
    })
    let constructedFilters: any = [...oldFilters];
    for (let i = 0; i < filters.length; i++) {
      if (filters[i].hierarchyLevel <= this.selectedRoleLevel) {
        let masterFilter = filters.filter((prevFilter: any) => {
          return Number(prevFilter.hierarchyLevel) === Number(filters[i].hierarchyLevel) - 1;
        })
        if (masterFilter?.length > 0 && masterFilter[0].hierarchyLevel && !this.rbacForm.value[filters[i].name.toLowerCase()] && this.rbacForm.value[masterFilter[0].name.toLowerCase()]) {
          let query = this.parseQuery(filters[i].query, this.rbacForm.value[masterFilter[0].name.toLowerCase()])
          await this._commonService.getReportDataNew(query).subscribe((res: any) => {
            let rows = res;
            filters[i]['options'] = rows;
            constructedFilters.push(filters[i])
            this.rbacForm?.controls?.[filters[i]?.name?.toLowerCase()]?.setValidators(Validators.required)
            this.rbacForm?.controls?.[filters[i]?.name?.toLowerCase()]?.updateValueAndValidity()
          })
        }
        else if (masterFilter?.length > 0 && this.rbacForm.value[masterFilter[0].name.toLowerCase()] === null) {
          constructedFilters.splice(i, 1);
          this.rbacForm?.controls?.[filters[i]?.name?.toLowerCase()]?.clearValidators()
          this.rbacForm?.controls?.[filters[i]?.name?.toLowerCase()]?.updateValueAndValidity()
        }
        if (filters[i].hierarchyLevel === baseHierarchy && !this.rbacForm.value[filters[i].name.toLowerCase()]) {
          await this._commonService.getReportDataNew(filters[i].query).subscribe((res: any) => {
            console.log(res);
            let rows = res;
            filters[i]['options'] = rows;
            constructedFilters.push(filters[i])
            this.rbacForm?.controls?.[filters[i]?.name?.toLowerCase()]?.setValidators(Validators.required)
            this.rbacForm?.controls?.[filters[i]?.name?.toLowerCase()]?.updateValueAndValidity()
          })
        }
      }
    }
    this.filters = constructedFilters;
  }

  parseQuery(query: any, masterLevel: any) {
    let startIndex = query.indexOf('{');
    let endIndex = query.indexOf('}');
    let masterRE = new RegExp(`{master_id}`, "g");
    if (query && masterLevel && startIndex != -1 && endIndex != -1) {
      query = query.replace(masterRE, '\'' + masterLevel + '\'');
    }
    return query;
  }

  resetFilterForm(form: any) {
    let { filters } = rbacConfig;
    filters.forEach((filter: any) => {
      form.controls[filter.name.toLowerCase()].reset()
      form.controls[filter.name.toLowerCase()].clearValidators();
      form.controls[filter.name.toLowerCase()].updateValueAndValidity();
    })
  }

}
