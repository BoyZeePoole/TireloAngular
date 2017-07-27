import { Routes, RouterModule }  from '@angular/router';

import { PeopleComponent} from '../people/people.component';
// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: PeopleComponent
  }
];

export const routing = RouterModule.forChild(routes);
