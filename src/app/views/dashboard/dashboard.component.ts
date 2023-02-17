import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { IDashboardMenu } from 'src/app/core/models/IDashboardCard';
import { CommonService } from 'src/app/core/services/common/common.service';
import { ConfigService } from 'src/app/core/services/config/config.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  dashboardMenu: IDashboardMenu[] | any;
  // isNvsk = environment.config.toLocaleLowerCase() === 'nvsk';
  isNvsk = false;
  constructor(private readonly _commonService: CommonService, private readonly _router: Router) {
    
  }

  ngOnInit(): void {
    this._commonService.getDashboardMetrics().subscribe((dashboardMenuResult: any) => {
      this.dashboardMenu=[]
      dashboardMenuResult?.data.forEach((dasboardMenu) => {
        let menuToDisplay: IDashboardMenu | any = {};
        menuToDisplay.title = dasboardMenu['Menu Name'];
        menuToDisplay.navigationURL = dasboardMenu['Navigation URL'];
        menuToDisplay.icon = dasboardMenu['Image URL'];
        menuToDisplay.isSelected = false;
        this.dashboardMenu?.push(menuToDisplay);
      });
    });
  }

  onClickOfDashboardItem(cardInfo: IDashboardMenu | undefined): void {
    if (cardInfo) {
      this._router.navigate([cardInfo.navigationURL.trim()]);
    }
  }

}
