import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MdInputModule, MdGridListModule} from '@angular/material';
import {RoleService} from '../services/role.service';
import {PersonService} from '../services/person.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {
  personForm: FormGroup;
  public roleData: any;
  public peopleData: any;
  public personModel= {
    Id: '',
    Surname: '',
    Initials: '',
    CoyNumber: '',
    Manager: {
      Id: '',
      Surname: '',
      Initials: ''
    },
    Role: {
      Id: '',
      RoleName: ''
    }
  }

  public pageProperties = {
    Title: 'Add Person',
    ActionButton: 'Add Person',
    EditMode: false
  }
  selectedRole: string;
  selectedPersonId: string;
  selectedManagerId: string;
  constructor(private fb: FormBuilder, 
              private roleService: RoleService,
              private personService: PersonService,
              private route: ActivatedRoute,
              private router: Router) {     
    this.getRoles();
    this.getPeople();
    this.createPersonForm();
  }
  getRoles() {
     this.roleService.getRoles()
       .subscribe(
         roles => {
           this.roleData = roles;
          //  this.selectedRole = this.roleData.id;
         },
         error => {
           //his.popToast('error', 'Error', this.errorService.displayError(error));
         });
  }

  getPeople() {
     this.personService.getPeople()
       .subscribe(
         people => {
           this.peopleData = people;
         },
         error => {
           //his.popToast('error', 'Error', this.errorService.displayError(error));
         });
  }
  ngOnInit() {    
     this.route.params.subscribe(params => {
      this.selectedPersonId = params['Id'];
      if(this.selectedPersonId) {        
        this.personService.getPerson(this.selectedPersonId)
          .subscribe(
            person => {
              this.personModel = person;
              this.selectedRole = person.Role.Id;
              this.selectedManagerId = (person.Manager) ? person.Manager.Id : null;
              this.pageProperties.Title = `Edit : ${this.personModel.Initials} - ${this.personModel.Surname}`;
              this.pageProperties.ActionButton = 'Update';
              this.pageProperties.EditMode = true;
            },
            error => {
              //this.popToast('error', 'Error', this.errorService.displayError(error));
            });
      }
      else {
       
      }
    });

  }
   createPersonForm() {
      this.personForm = this.fb.group({
        surname: ['', Validators.required],
        initials: ['', Validators.required],
        coynumber: ['', Validators.required],
        role: [null],
        manager: null
      })
   }
  addPerson(formValues) : void {
    if (this.personForm.invalid) return;
    this.personModel.Surname = formValues.surname;
    this.personModel.Initials = formValues.initials;
    this.personModel.Manager = {
      Id:  formValues.manager,
      Surname: '',
      Initials: ''
    };
    this.personModel.Role = {
      Id: formValues.role,
      RoleName: ''
    };
    this.personModel.CoyNumber = formValues.coynumber;
    this.personService.upsertPerson(this.personModel)
    .subscribe(
      success => {
        //this.popToast('success', 'Success', this.popupMessage);
        this.router.navigate(['/people']);
      },
      error => {
        //this.errorMessage = error;
        //this.popToast('error', 'Error', this.errorService.displayError(error));
      });    

    }
  }
