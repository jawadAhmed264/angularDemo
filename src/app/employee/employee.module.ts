import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeService } from './employeeServices/employee.service';
import { ListEmpComponent } from './list-emp/list-emp.component';
import { AddEmpComponent } from './add-emp/add-emp.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    ListEmpComponent,
    AddEmpComponent
  ],
  imports: [
    CommonModule,
    TranslateModule.forChild({
      extend:true
    }),
    EmployeeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
  ],
  providers:[EmployeeService]
})
export class EmployeeModule { }
