import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RoleComponent} from './role.component';
import { MdInputModule, MdButtonModule, MdCardModule, MdMenuModule, MdToolbarModule, MdIconModule, MdDatepickerModule, MdSidenavModule, MdListModule, MdGridListModule } from '@angular/material';
import { RoleService} from '../services/role.service';
import { AuthHeaderService } from '../services/auth-header.service';
import { ConfigurationService } from '../services/tirelo.config.service'
import {routing} from './role.routing';
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    routing,
    MdInputModule, 
    MdButtonModule, 
    MdCardModule, 
    MdMenuModule, 
    MdToolbarModule, 
    MdIconModule,
    MdListModule,
    MdGridListModule
  ],
  declarations: [RoleComponent],
  providers: [
          RoleService,
          AuthHeaderService,
          ConfigurationService
  ],
})
export class RoleModule { }
