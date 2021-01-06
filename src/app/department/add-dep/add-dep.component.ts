import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder,FormGroup, Validators} from '@angular/forms'
import { DepartmentService } from '../departmentServices/department.service'
import { Department } from 'src/app/department/Models/department';

@Component({
  selector: 'app-add-dep',
  templateUrl: './add-dep.component.html',
  styleUrls: ['./add-dep.component.css']
})
export class AddDepComponent implements OnInit {
  @Input() formTitle:string;
  @Input() department:Department;
  constructor(public activeModal: NgbActiveModal,private fb:FormBuilder,private service:DepartmentService) { }
  
  depForm:FormGroup;

  ngOnInit(): void {
      this.depForm=this.fb.group({
        depName:[this.department.DepName,[Validators.required]]
      });
  }
  onSubmit(){
    if(this.department.Id==0){
    this.service.add(this.depForm.value).subscribe(data=>{
        this.activeModal.close('Notify click');
    });
    }
    else{
      this.department.DepName=this.depForm.value.depName;
      this.service.update(this.department.Id,this.department).subscribe(data=>{
        this.activeModal.close('Notify click');
    });
    }
  }
}
