import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {EmployeeService} from "../../services/employee.service";

@Component({
  selector: 'app-add-new-employee',
  templateUrl: './add-new-employee.component.html',
  styleUrl: './add-new-employee.component.scss'
})
export class AddNewEmployeeComponent implements OnInit {
  employees: Array<any> = [];
  jobOptions: Array<any> = [];
  departmentOptions: Array<any> = [];

  value: any;
  employeeForm: FormGroup | any;

  constructor(private fb: FormBuilder, private _router: Router,
              private _employeeService:EmployeeService) {

  }

  ngOnInit(): void {

    this.employeeForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      job: ['', [Validators.required]],
      department: ['', [Validators.required]]
    })

    this.extractJobOptions();
    this.extractDepartmentOptions();


    console.log(this.jobOptions);
    console.log('Department Options:', this.departmentOptions);

  }



  saveEmployee() {
    if (this.employeeForm.valid) {
      console.log('Form data:', this.employeeForm.value);
      // Optionally, you might want to clear the form after saving
      this.employeeForm.reset();
      this.employeeForm.markAsPristine();
      this.employeeForm.markAsUntouched();
    } else {
      // If the form is invalid, mark all controls as touched
      this.employeeForm.markAllAsTouched();
    }
  }

  extractJobOptions() {
    const jobSet = new Set(this._employeeService.employees.map(employee => employee.job));
    this.jobOptions = Array.from(jobSet).map(job => ({ name: job }));
    console.log(this.jobOptions)
  }
  extractDepartmentOptions() {
    const departmentSet = new Set(this._employeeService.employees.map(employee => employee.department));
    this.departmentOptions = Array.from(departmentSet).map(department => ({ name: department }));
    console.log('Department Options:', this.departmentOptions);
  }



}
