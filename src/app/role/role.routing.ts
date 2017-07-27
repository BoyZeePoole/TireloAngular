import { Routes, RouterModule }  from '@angular/router';

import { RoleComponent } from './role.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: RoleComponent
  },
    {
    path: ':Id',
    component: RoleComponent
  }
];

export const routing = RouterModule.forChild(routes);
