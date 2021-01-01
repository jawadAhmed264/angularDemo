import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeService } from './sharedServices/employee.service';
import { DepartmentService } from './sharedServices/department.service';

import {HttpClientModule} from '@angular/common/http';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { ListDepComponent } from './Departments/list-dep/list-dep.component';
import { AddDepComponent } from './Departments/add-dep/add-dep.component';
import { ListEmpComponent } from './Employees/list-emp/list-emp.component';
import { AddEmpComponent } from './Employees/add-emp/add-emp.component';
import { RegisterComponent } from './Account/register/register.component';
import { LoginComponent } from './Account/login/login.component';
import { AccountService } from './sharedServices/account.service';

@NgModule({
  declarations: [
    AppComponent,
    ListDepComponent,
    AddDepComponent,
    ListEmpComponent,
    AddEmpComponent,
    RegisterComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [EmployeeService,DepartmentService,AccountService],
  bootstrap: [AppComponent]
})
export class AppModule { }
