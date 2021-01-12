import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Department } from 'src/app/department/Models/department';
import { DepartmentService } from '../departmentServices/department.service'
import { AddDepComponent } from '../add-dep/add-dep.component';
import { AccountService } from 'src/app/sharedServices/account.service';
import pdfMake from 'pdfmake/build/pdfmake.js';
import pdfFonts from 'pdfmake/build/vfs_fonts.js';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
   selector: 'app-list-dep',
   templateUrl: './list-dep.component.html',
   styleUrls: ['./list-dep.component.css']
})
export class ListDepComponent implements OnInit {

   DepartmentList: Department[];
   constructor(
      private service: DepartmentService,
      private modalService: NgbModal,
      public userService: AccountService) { }

   ngOnInit(): void {
      this.service.getList().subscribe(data => {
         this.DepartmentList = data;
      });
   }

   generatePdf() {
      pdfMake.createPdf(this.getDocumentDefinition()).open();
   }

   getDocumentDefinition() {
      let docDefinition = {
         content: [
            {
               text: 'Department List',
               style: 'header'
            },
            {
               table: {
                  headerRows: 1,
                  widths: ['*', '*'],
                  body: [
                     ['ID', 'Department Name'],
                     ...this.DepartmentList.map(d => ([d.Id, d.DepName]))
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
            tableHeader: { fillColor: 'black', color: 'white', bold: true, fontSize: 14, margin: [20, 0, 0, 10] },
         }
      };
      return docDefinition;
   }

   trackByDepId(i: number, dep: Department): number {
      return dep.Id;
   }

   add() {
      const modalRef = this.modalService.open(AddDepComponent);
      modalRef.componentInstance.formTitle = "Add new Department";
      let dep = new Department();
      dep.Id = 0;
      dep.DepName = "";
      modalRef.componentInstance.department = dep;
      modalRef.closed.subscribe(result => {
         this.refList();
      });
   }

   update(dep: Department) {
      const modalRef = this.modalService.open(AddDepComponent);
      modalRef.componentInstance.formTitle = "Edit Department";
      modalRef.componentInstance.department = dep;
      modalRef.closed.subscribe(result => {
         this.refList();
      });
   }

   delete(dep: Department) {
      const chk = confirm("do you want to delete record?");
      if (chk) {
         this.service.delete(dep.Id).subscribe(data => {
            this.refList();
            console.log("Deleted");
         });
      }
   }

   refList() {
      this.service.getList().subscribe(data => { this.DepartmentList = data });
   }

}

