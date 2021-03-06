import { Department } from "../../department/Models/department";

export class Employee {
    Id: number;
    EmpName: string;
    Contact: string;
    Salary: number;
    Age: number;
    DepId: number;
    Department: Department;
    Gender: string;
}

export class EmployeeList {
    Employees: Employee[];
    TotalEmployees: number
}
