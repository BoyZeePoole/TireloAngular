import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'person', loadChildren: './person/person.module#PersonModule' },  
  { path: 'people', loadChildren:  './people/people.module#PeopleModule' },
  { path: 'role', loadChildren:  './role/role.module#RoleModule' },  
  { path: 'roles', loadChildren:  './roles/roles.module#RolesModule' },
  { path: 'course', loadChildren:  './course/course.module#CourseModule' },  
  { path: 'courses', loadChildren:  './courses/courses.module#CoursesModule' },  
  { path: 'personcourses', loadChildren:  './person-courses/person-courses.module#PersonCoursesModule' },  
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' }
];

export const routing = RouterModule.forRoot(routes, { useHash: true });