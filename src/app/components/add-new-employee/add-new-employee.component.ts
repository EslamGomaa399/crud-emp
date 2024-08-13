import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {EmployeeService} from "../../services/employee.service";
import {HttpClient} from "@angular/common/http";

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
  cities: any;

  selectedCity: any;
  date1: Date | undefined;

  selectedManager: string | undefined;
  managers = [
    { label: 'John Doe', value: 'John Doe' },
    { label: 'Jane Smith', value: 'Jane Smith' },
    { label: 'Alice Johnson', value: 'Alice Johnson' },
    { label: 'Bob Brown', value: 'Bob Brown' },
    { label: 'Emily Davis', value: 'Emily Davis' }
  ];

  constructor(private fb: FormBuilder,
              private _router: Router,
              private _employeeService:EmployeeService) {

  }

  ngOnInit(): void {

    this.fetchAllDepartments();

    this.employeeForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      jobTitle: ['', Validators.required],
      departmentName: ['', Validators.required],
      managerName: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required],
      street: ['', Validators.required],
      postalCode: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      hireDate: ['', Validators.required],
      salary: ['', Validators.required],
    })

    this.extractJobOptions();
    this.extractDepartmentOptions();

    console.log(this.jobOptions);
    console.log('Department Options:', this.departmentOptions);

  }

  saveEmployee() {
    console.log(this.employeeForm)
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

  resetForm() {
    this.employeeForm.reset();
  }

  private fetchAllDepartments() {
    // this._httpClient.get('http://localhost:9090/api/departments')
    //     .subscribe((response) => console.log(response))
  }














}
