import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Department } from 'src/app/department/Models/department';
import { DepartmentService } from '../departmentServices/department.service'
import { AddDepComponent } from '../add-dep/add-dep.component';
import { AccountService } from 'src/app/sharedServices/account.service';
import html2pdf from 'html2pdf.js';

@Component({
   selector: 'app-list-dep',
   templateUrl: './list-dep.component.html',
   styleUrls: ['./list-dep.component.css']
})
export class ListDepComponent implements OnInit {
   hideTable = 'none';
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

   download() {
      const opt = {
         margin: 1,
         filename: 'myfile.pdf',
         image: { type: 'jpeg', quality: 1 },
         html2canvas: { scale: 2 },
         jsPDF: { unit: 'in', format: 'A4', orientation: 'portrait' }
      };

      const element = document.getElementById('exporttoPDF').innerHTML;
      html2pdf().from(element).set(opt).toPdf().get('pdf').then(function (pdf) {
         window.open(pdf.output('bloburl'), '_blank');
      });


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

