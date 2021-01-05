import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeService } from './sharedServices/employee.service';
import { DepartmentService } from './sharedServices/department.service';

import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { ListDepComponent } from './Departments/list-dep/list-dep.component';
import { AddDepComponent } from './Departments/add-dep/add-dep.component';
import { ListEmpComponent } from './Employees/list-emp/list-emp.component';
import { AddEmpComponent } from './Employees/add-emp/add-emp.component';
import { RegisterComponent } from './Account/register/register.component';
import { LoginComponent } from './Account/login/login.component';
import { AccountService } from './sharedServices/account.service';
import { NavComponent } from './Structure/nav/nav.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    ListDepComponent,
    AddDepComponent,
    ListEmpComponent,
    AddEmpComponent,
    RegisterComponent,
    LoginComponent,
    NavComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [EmployeeService,DepartmentService,AccountService,
    {provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true},
    AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
