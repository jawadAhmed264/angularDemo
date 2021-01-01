import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './Account/login/login.component';
import { RegisterComponent } from './Account/register/register.component';
import { ListDepComponent } from './Departments/list-dep/list-dep.component';
import { ListEmpComponent } from './Employees/list-emp/list-emp.component';


const routes: Routes = [
  {path:'employee',component:ListEmpComponent},
  {path:'department',component:ListDepComponent},
  {path:'register',component:RegisterComponent},
  {path:'login',component:LoginComponent},
  {path: '',  redirectTo: '/department', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
