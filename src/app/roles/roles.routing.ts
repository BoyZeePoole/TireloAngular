import { Routes, RouterModule }  from '@angular/router';

import { RolesComponent} from './roles.component';
// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: RolesComponent
  }
];

export const routing = RouterModule.forChild(routes);
