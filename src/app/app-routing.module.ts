import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './Account/login/login.component';
import { RegisterComponent } from './Account/register/register.component';
import { AuthGuard } from './auth/auth.guard';
import { ListDepComponent } from './Departments/list-dep/list-dep.component';
import { ListEmpComponent } from './Employees/list-emp/list-emp.component';


const routes: Routes = [
  {path:'employee',component:ListEmpComponent,canActivate:[AuthGuard]},
  {path:'department',component:ListDepComponent,canActivate:[AuthGuard]},
  {path:'register',component:RegisterComponent},
  {path:'login',component:LoginComponent},
  {path: '',  redirectTo: '/department', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
