import { Component } from '@angular/core';
import { Http } from '@angular/http';
import {FormControl} from '@angular/forms';
import {MdInputModule, MdGridListModule} from '@angular/material';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import {MdSidenavModule} from '@angular/material';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
 routes: Object[] = [{
      icon: 'home',
      route: '/home',
      title: 'Home',
    }, {
      icon: 'Person',
      route: '/people',
      title: 'Employees',
    }, {
      icon: 'Roles',
      route: '/roles',
      title: 'Roles',
    }, {
      icon: 'Courses',
      route: '/courses',
      title: 'Courses',
    }
  ];  
  constructor() {   
  }
}
