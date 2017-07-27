import { Routes, RouterModule }  from '@angular/router';

import { CoursesComponent} from '../courses/courses.component';
// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: CoursesComponent
  }
];

export const routing = RouterModule.forChild(routes);
