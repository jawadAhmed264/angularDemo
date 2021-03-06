import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Department } from 'src/app/department/Models/department';
import { Employee } from 'src/app/employee/Models/employee';
import { DepartmentService } from 'src/app/department/departmentServices/department.service';
import { EmployeeService } from 'src/app/employee/employeeServices/employee.service';
import { MessageService } from 'primeng/api';
import { CountryISO, PhoneNumberFormat, SearchCountryField, TooltipLabel } from 'ngx-intl-tel-input';

@Component({
  selector: 'app-add-emp',
  templateUrl: './add-emp.component.html',
  styleUrls: ['./add-emp.component.css']
})
export class AddEmpComponent implements OnInit {

  @Input() formTitle: string;
  @Input() employee: Employee;

  separateDialCode = false;
  SearchCountryField = SearchCountryField;
  TooltipLabel = TooltipLabel;
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.UnitedKingdom, CountryISO.Pakistan];

  departmentList: Department[];
  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder,
    private depService: DepartmentService, private service: EmployeeService,
    private messageService: MessageService) { }

  empForm: FormGroup;



  ngOnInit(): void {
    this.empForm = this.fb.group({
      empName: [this.employee.EmpName, [Validators.required, Validators.maxLength(50), Validators.minLength(3), Validators.pattern("[a-zA-Z ]*")]],
      Gender: [this.employee.Gender, [Validators.required]],
      Contact: [this.employee.Contact, [Validators.required]],
      Age: [this.employee.Age, [Validators.required, Validators.min(18), Validators.max(70)]],
      Salary: [this.employee.Salary, [Validators.required, Validators.pattern("[0-9]*")]],
      depId: [this.employee.DepId, [Validators.required]]
    });
    this.depService.getList().subscribe(res => { this.departmentList = res })
  }

  changePreferredCountries() {
    this.preferredCountries = [CountryISO.UnitedStates, CountryISO.UnitedKingdom, CountryISO.Pakistan];
  }

  onSubmit() {
    // this.empForm.controls["Contact"] = this.empForm.controls["Contact"].value.e164Number;
    // console.log(this.empForm.value);
    if (this.employee.Id == 0) {
      let employee = new Employee();
      employee.EmpName = this.empForm.controls["empName"].value;
      employee.Gender = this.empForm.controls["Gender"].value;
      employee.Contact = this.empForm.controls["Contact"].value.e164Number;
      employee.Age = this.empForm.controls["Age"].value;
      employee.Salary = this.empForm.controls["Salary"].value;
      employee.DepId = this.empForm.controls["depId"].value;

      this.service.add(employee).subscribe(data => {
        this.messageService.add({
          severity: 'success',
          summary: 'Successfully',
          detail: 'new Employee added',
        });
        this.activeModal.close('Notify click');
      });
    }
    else {
      this.employee.EmpName = this.empForm.controls["empName"].value;
      this.employee.Gender = this.empForm.controls["Gender"].value;
      this.employee.Contact = this.empForm.controls["Contact"].value.e164Number;
      this.employee.Age = this.empForm.controls["Age"].value;
      this.employee.Salary = this.empForm.controls["Salary"].value;
      this.employee.DepId = this.empForm.controls["depId"].value;
      this.service.update(this.employee.Id, this.employee).subscribe(data => {
        this.messageService.add({
          severity: 'success',
          summary: 'Successfully',
          detail: 'Employee Updated',
        });
        this.activeModal.close('Notify click');
      });
    }
  }

}
