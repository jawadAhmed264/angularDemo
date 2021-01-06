import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Employee } from 'src/app/employee/Models/employee';
import { DepartmentService } from 'src/app/department/departmentServices/department.service';
import { EmployeeService } from 'src/app/employee/employeeServices/employee.service';
import { AddEmpComponent } from '../add-emp/add-emp.component';

@Component({
  selector: 'app-list-emp',
  templateUrl: './list-emp.component.html',
  styleUrls: ['./list-emp.component.css']
})
export class ListEmpComponent implements OnInit {

  EmployeeList:Employee[];
  constructor(private depService:DepartmentService,private service:EmployeeService,private modalService: NgbModal) { }

  ngOnInit(): void {
     this.service.getList().subscribe(data=>{
        this.EmployeeList=data;
     });
  }
  
  trackByEmpId(i:number,emp:Employee):number{
     return emp.Id;
  }

  add() {
   const modalRef = this.modalService.open(AddEmpComponent);
   modalRef.componentInstance.formTitle="Add new Employee";
   let emp=new Employee();
   emp.Id=0;
   emp.Age=18;
   emp.Contact="";
   emp.EmpName="";
   emp.Gender="";
   emp.Salary=0;
   emp.DepId=-1;
   modalRef.componentInstance.employee=emp;
   modalRef.closed.subscribe(result => {
      this.refList();
  });
 }
 
 update(emp:Employee) {
   const modalRef = this.modalService.open(AddEmpComponent);
   modalRef.componentInstance.formTitle="Edit Employee";
   modalRef.componentInstance.employee=emp;
   modalRef.closed.subscribe(result => {
      this.refList();
  });
 }
 
 delete(emp:Employee){
    const chk=confirm("do you want to delete record?");
    if(chk){
       this.service.delete(emp.Id).subscribe(data=>{
         this.refList(); 
         console.log("Deleted");
       });
    }
 }

 refList(){
    this.service.getList().subscribe(data=>{
       this.EmployeeList=data;
      });
 }

}
