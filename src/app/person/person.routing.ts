import { Routes, RouterModule }  from '@angular/router';

import { PersonComponent } from './person.component';
// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: PersonComponent
  },
    {
    path: ':Id',
    component: PersonComponent
  }
];

export const routing = RouterModule.forChild(routes);
