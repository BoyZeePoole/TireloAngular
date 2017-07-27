import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import {MdInputModule, MdGridListModule} from '@angular/material';
import {RoleService} from '../services/role.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {
roleForm: FormGroup;
selectedRoleId: string;

  public roleModel = {
    Id: '',   
    RoleName: ''
  };
  public pageProperties = {
    Title: 'Add Role',
    ActionButton: 'Add Role'
  }
  constructor(private fb: FormBuilder,
              private roleService: RoleService,
              private route: ActivatedRoute,
              private router: Router) { 
    this.createRoleForm();
  }

  ngOnInit() {

     this.route.params.subscribe(params => {
      this.selectedRoleId = params['Id'];
      if(this.selectedRoleId) {        
        this.roleService.getRole(this.selectedRoleId)
          .subscribe(
            role => {
              this.roleModel = role;
              this.pageProperties.Title = `Edit : ${this.roleModel.RoleName}`;
              this.pageProperties.ActionButton = 'Update';
            },
            error => {
              //this.popToast('error', 'Error', this.errorService.displayError(error));
            });
      }
      else {
       
      }
    });



  }
   createRoleForm() {
      this.roleForm = this.fb.group({
        'id': null,
        'roleName': [null, Validators.required]       

      })
   }
    addRole(formValues) : void {
      if (this.roleForm.invalid) return;
      this.roleModel.RoleName = formValues.roleName;
      this.roleService.upsertRole(this.roleModel)
      .subscribe(
        success => {
          //this.popToast('success', 'Success', this.popupMessage);
          this.router.navigate(['/roles']);
        },
        error => {
          //this.errorMessage = error;
          //this.popToast('error', 'Error', this.errorService.displayError(error));
        });    

      }
    }
