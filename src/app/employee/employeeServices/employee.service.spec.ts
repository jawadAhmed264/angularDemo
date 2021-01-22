import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { EmployeeService } from './employee.service';

describe('EmployeeService', () => {
  let service: EmployeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HttpClient]
    });
    service = TestBed.inject(EmployeeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return emp by id', (done: DoneFn) => {
    service.get(1).subscribe(data => {
      expect(data.EmpName).toBe("Jawad Ahmed");
      done();
    });

  });
});
