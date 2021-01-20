import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './Account/login/login.component';
import { RegisterComponent } from './Account/register/register.component';
import { AuthGuard } from './auth/auth.guard';
import { ForbiddenComponent } from './error/forbidden/forbidden.component';
import { UploadDownloadComponent } from './upload-download/upload-download.component';


const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'file', component: UploadDownloadComponent },
  { path: 'department', loadChildren: () => import('./department/department.module').then(m => m.DepartmentModule), canActivate: [AuthGuard], data: { roles: ['Admin', 'SubAdmin', 'User'] } },
  { path: 'employee', loadChildren: () => import('./employee/employee.module').then(m => m.EmployeeModule), canActivate: [AuthGuard], data: { roles: ['Admin', 'SubAdmin'] } },
  { path: 'forbidden', component: ForbiddenComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/department', pathMatch: 'full' },
  { path: '**', redirectTo: '/forbidden', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
