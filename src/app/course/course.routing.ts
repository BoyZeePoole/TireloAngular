import { Routes, RouterModule }  from '@angular/router';

import { CourseComponent } from './course.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: CourseComponent
  },
    {
    path: ':Id',
    component: CourseComponent
  }
];

export const routing = RouterModule.forChild(routes);
