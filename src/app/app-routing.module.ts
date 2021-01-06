import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './Account/login/login.component';
import { RegisterComponent } from './Account/register/register.component';
import { AuthGuard } from './auth/auth.guard';
import { ForbiddenComponent } from './error/forbidden/forbidden.component';


const routes: Routes = [
  {path:'register',component:RegisterComponent},
  {path:'login',component:LoginComponent},
  {path:'department' ,loadChildren: () => import('./department/department.module').then(m => m.DepartmentModule),canActivate:[AuthGuard]},
  {path:'employee' ,loadChildren: () => import('./employee/employee.module').then(m => m.EmployeeModule),canActivate:[AuthGuard]},
  {path: 'forbidden', component: ForbiddenComponent, canActivate: [AuthGuard] },
  {path: '',  redirectTo: '/department', pathMatch: 'full' },
  {path: '**',  redirectTo: '/forbiddden', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
