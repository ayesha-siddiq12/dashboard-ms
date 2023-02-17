

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { KeycloakSecurityService } from '../keycloak-security.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

import { CookieService } from 'ngx-cookie-service';

import { AppServiceComponent } from 'src/app/app.service';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class HomePageComponent implements OnInit {
  adminUrl;
  adminDashUrl;
  role;
  storage
  hideAdmin

  cards = [
    {
      title: 'stateOffcer',
      description: 'This is the description for card 1',
      imageUrl: 'state.png'
    },
    {
      title: 'districtOffcer',  
      description: 'This is the description for card 2',
      imageUrl: 'district.png'
    },
    {
      title: 'Card 3',
      description: 'This is the description for card 3',
      imageUrl: 'block.png'
    },
    {
      title: 'Card 4',
      description: 'This is the description for card 4',
      imageUrl: 'cluster.png'
    },
    {
      title: 'Card 5',
      description: 'This is the description for card 5',
      imageUrl: 'principle.png'
    },
    {
      title: 'Card 6',
      description: 'This is the description for card 6',
      imageUrl: 'class.png'
    }
  ];
  constructor(public router: Router, public service: AppServiceComponent) {

  }

  ngOnInit(): void {
    // this.adminUrl = environment.adminUrl;
    this.storage = window.localStorage;
    this.hideAdmin = localStorage.getItem('roleName') === 'admin' ? true : false;
    if (localStorage.getItem('roleName') !== 'admin') {
      //this.router.navigate(['/dashboard']);
    }

  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/signin'])

  }

  onDashboard() {
    this.router.navigate(['/rbac'])
  }


  submit() {

    let obj = {
      'userid': localStorage.getItem('user_id'),
      'roleName': localStorage.getItem('roleName'),
      'userName': localStorage.getItem('userName'),
      'token': localStorage.getItem('token')
    }



  }
  
}