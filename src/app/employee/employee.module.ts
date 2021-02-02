import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeService } from './employeeServices/employee.service';
import { ListEmpComponent } from './list-emp/list-emp.component';
import { AddEmpComponent } from './add-emp/add-emp.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { CurrencyConverterPipe } from '../pipes/currencyConverter.pipe';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

@NgModule({
  declarations: [
    ListEmpComponent,
    AddEmpComponent,
    CurrencyConverterPipe
  ],
  imports: [
    CommonModule,
    TranslateModule.forChild({
      extend: true
    }),
    EmployeeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    TableModule,
    DropdownModule,
    InputTextModule,
    ButtonModule,
    RippleModule,
    ToastModule,
    ConfirmDialogModule,
    BsDropdownModule,
    TooltipModule,
    NgxIntlTelInputModule
  ],
  providers: [EmployeeService, MessageService, ConfirmationService],
  exports: [CurrencyConverterPipe]
})
export class EmployeeModule { }
