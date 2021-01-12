import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Employee } from 'src/app/employee/Models/employee';
import { DepartmentService } from 'src/app/department/departmentServices/department.service';
import { EmployeeService } from 'src/app/employee/employeeServices/employee.service';
import { AddEmpComponent } from '../add-emp/add-emp.component';
import { AccountService } from 'src/app/sharedServices/account.service';
import pdfMake from 'pdfmake/build/pdfmake.js';
import pdfFonts from 'pdfmake/build/vfs_fonts.js';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
   selector: 'app-list-emp',
   templateUrl: './list-emp.component.html',
   styleUrls: ['./list-emp.component.css']
})
export class ListEmpComponent implements OnInit {

   EmployeeList: Employee[];
   constructor(private depService: DepartmentService,
      private service: EmployeeService,
      public userService: AccountService,
      private modalService: NgbModal) { }

   ngOnInit(): void {
      this.service.getList().subscribe(data => {
         this.EmployeeList = data;
      });
   }

   generatePdf() {
      pdfMake.createPdf(this.getDocumentDefinition()).open();
   }

   getDocumentDefinition() {
      let docDefinition = {
         content: [
            {
               text: 'Employee List',
               style: 'header'
            },
            {
               table: {
                  headerRows: 1,
                  widths: [30, 'auto', 'auto', 'auto', 40, 70, 'auto'],
                  body: [
                     [{ text: 'ID', style: 'tableHeader' },
                     { text: 'Employee Name', style: 'tableHeader' },
                     { text: 'Gender', style: 'tableHeader' },
                     { text: 'Contact', style: 'tableHeader' },
                     { text: 'Age', style: 'tableHeader' },
                     { text: 'Salary', style: 'tableHeader' },
                     { text: 'Department', style: 'tableHeader' }],
                     ...this.EmployeeList.map(e => ([e.Id, e.EmpName, e.Gender, e.Contact, e.Age, e.Salary, e.Department.DepName]))
                  ]
               }
            }
         ],
         styles: {
            header: {
               fontSize: 24,
               bold: true,
               alignment: 'center',
               margin: [0, 0, 0, 50]
            },
            tableHeader: { fillColor: 'black', color: 'white', bold: true, fontSize: 10, margin: [0, 0, 0, 10], alignment: 'center' },
         }
      };
      return docDefinition;
   }

   trackByEmpId(i: number, emp: Employee): number {
      return emp.Id;
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
         this.refList();
      });
   }

   update(emp: Employee) {
      const modalRef = this.modalService.open(AddEmpComponent);
      modalRef.componentInstance.formTitle = "Edit Employee";
      modalRef.componentInstance.employee = emp;
      modalRef.closed.subscribe(result => {
         this.refList();
      });
   }

   delete(emp: Employee) {
      const chk = confirm("do you want to delete record?");
      if (chk) {
         this.service.delete(emp.Id).subscribe(data => {
            this.refList();
            console.log("Deleted");
         });
      }
   }

   refList() {
      this.service.getList().subscribe(data => {
         this.EmployeeList = data;
      });
   }

}
