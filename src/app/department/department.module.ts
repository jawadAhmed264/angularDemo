import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepartmentRoutingModule } from './department-routing.module';
import { DepartmentService } from './departmentServices/department.service';
import { ListDepComponent } from './list-dep/list-dep.component';
import { AddDepComponent } from './add-dep/add-dep.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
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
    NgbModule,
    ToastModule,
    ConfirmDialogModule
  ],
  providers: [DepartmentService, MessageService, ConfirmationService]
})
export class DepartmentModule { }
