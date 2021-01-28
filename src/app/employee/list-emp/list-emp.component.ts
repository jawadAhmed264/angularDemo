import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Employee } from 'src/app/employee/Models/employee';
import { DepartmentService } from 'src/app/department/departmentServices/department.service';
import { EmployeeService } from 'src/app/employee/employeeServices/employee.service';
import { AddEmpComponent } from '../add-emp/add-emp.component';
import { AccountService } from 'src/app/sharedServices/account.service';
import html2pdf from 'html2pdf.js';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';

@Component({
   selector: 'app-list-emp',
   templateUrl: './list-emp.component.html',
   styleUrls: ['./list-emp.component.css']
})
export class ListEmpComponent implements OnInit {
   valueDate = new Date();
   EmployeeList: Employee[];
   cols: any[];
   loading: boolean = true;
   totalRecords: number;
   tableData;

   constructor(private depService: DepartmentService,
      private service: EmployeeService,
      public userService: AccountService,
      private modalService: NgbModal,
      private messageService: MessageService,
      private confirmationService: ConfirmationService) { }

   ngOnInit(): void {

      this.cols = [
         { header: 'Name' },
         { header: 'Age' },
         { header: 'Gender' },
         { header: 'Contact' },
         { header: 'Salary' },
         { header: 'Department' }
      ];
   }

   loadCustomers(event: LazyLoadEvent) {
      this.loading = true;
      this.tableData = event;
      setTimeout(() => {
         this.service.getEmployeeByFilters(JSON.stringify(this.tableData)).subscribe(res => {
            this.EmployeeList = res.Employees;
            this.totalRecords = res.TotalEmployees;
            this.loading = false;
         })
      }, 1000);
      console.log(JSON.stringify(event));
   }

   download() {
      const opt = {
         margin: 0.5,
         filename: 'myfile.pdf',
         image: { type: 'jpeg', quality: 0.98 },
         html2canvas: { scale: 1 },
         jsPDF: {}
      };
      if (this.cols.length > 7) {
         opt.jsPDF = { unit: 'in', format: 'A4', orientation: 'landscape' }
      }
      else {
         opt.jsPDF = { unit: 'in', format: 'A4', orientation: 'portrait' }
      }
      const element = document.getElementById('exporttoPDF').innerHTML;
      html2pdf().from(element).set(opt).toPdf().get('pdf').then(function (pdf) {
         window.open(pdf.output('bloburl'), '_blank');
      });
   }
   add() {
      const modalRef = this.modalService.open(AddEmpComponent);
      modalRef.componentInstance.formTitle = "Add new Employee";
      let emp = new Employee();
      emp.Id = 0;
      emp.Age = 18;
      emp.Contact = "";
      emp.EmpName = "";
      emp.Gender = "";
      emp.Salary = 0;
      emp.DepId = -1;
      modalRef.componentInstance.employee = emp;
      modalRef.closed.subscribe(result => {
         this.loadCustomers(this.tableData);
      });
   }

   update(emp: Employee) {
      const modalRef = this.modalService.open(AddEmpComponent);
      modalRef.componentInstance.formTitle = "Edit Employee";
      modalRef.componentInstance.employee = emp;
      modalRef.closed.subscribe(result => {
         this.loadCustomers(this.tableData);
      });
   }

   delete(emp: Employee) {
      this.confirmationService.confirm({
         message: 'Are you sure that you want to delete the record',
         accept: () => {
            this.service.delete(emp.Id).subscribe(data => {
               this.loadCustomers(this.tableData);
               this.messageService.add({
                  severity: 'success',
                  summary: 'Successfully',
                  detail: 'Employee deleted Successfully',
               });
            }, error => {
               this.messageService.add({
                  severity: 'error',
                  summary: 'Failed',
                  detail: 'Employee can not be deleted,there is some issue',
               });
            });
         }
      });
   }

   // refList() {
   //    this.service.getList().subscribe(data => {
   //       this.EmployeeList = data;
   //    });
   // }

   exportExcel() {
      import("xlsx").then(xlsx => {
         const worksheet = xlsx.utils.json_to_sheet(this.EmployeeList);
         const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
         const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
         this.saveAsExcelFile(excelBuffer, "products");
      });
   }

   saveAsExcelFile(buffer: any, fileName: string): void {
      import("file-saver").then(FileSaver => {
         let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
         let EXCEL_EXTENSION = '.xlsx';
         const data: Blob = new Blob([buffer], {
            type: EXCEL_TYPE
         });
         FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
      });
   }

}
