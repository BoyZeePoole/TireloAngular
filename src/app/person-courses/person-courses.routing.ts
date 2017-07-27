import { Routes, RouterModule }  from '@angular/router';

import { PersonCoursesComponent } from './person-courses.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: PersonCoursesComponent
  },
    {
    path: ':Id',
    component: PersonCoursesComponent
  }
];

export const routing = RouterModule.forChild(routes);