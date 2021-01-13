import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepartmentRoutingModule } from './department-routing.module';
import { DepartmentService } from './departmentServices/department.service';
import { ListDepComponent } from './list-dep/list-dep.component';
import { AddDepComponent } from './add-dep/add-dep.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ListDepComponent,
    AddDepComponent
  ],
  imports: [
    CommonModule,
    TranslateModule.forChild({
      extend: true
    }),
    DepartmentRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [DepartmentService]
})
export class DepartmentModule { }
