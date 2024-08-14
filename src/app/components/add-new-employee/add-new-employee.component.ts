import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EmployeeService} from "../../services/employee.service";
import {CustomService} from "../../services/custom.service";
import {Department, Job} from "../../models/department";



@Component({
  selector: 'app-add-new-employee',
  templateUrl: './add-new-employee.component.html',
  styleUrl: './add-new-employee.component.scss',

})
export class AddNewEmployeeComponent implements OnInit {
  employees: Array<any> = [];
  jobOptions: Array<string> = [];
  departmentOptions: Array<string> = [];

  value: any;
  employeeForm: FormGroup | any;
  cities: any;

  selectedCity: any;
  date1: Date | undefined;

  selectedManager: string | undefined;
  managers = [];

  constructor(private fb: FormBuilder,
              private _employeeService:EmployeeService,
              private customService:CustomService) {

  }

  ngOnInit(): void {

    this.getDepartments();
    this.getJobs();

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



  }

  saveEmployee() {

    if (this.employeeForm.valid) {
      // Optionally, you might want to clear the form after saving
      this.employeeForm.reset();
      this.employeeForm.markAsPristine();
      this.employeeForm.markAsUntouched();
    } else {
      // If the form is invalid, mark all controls as touched
      this.employeeForm.markAllAsTouched();
    }
  }


  resetForm() {
    this.employeeForm.reset();
  }

  getDepartments(): void {
    this.customService.getDepartments().subscribe({
      next: (departments: Department[]) => {
        this.departmentOptions = departments.map((dept) => dept.departmentName);
        console.log(this.departmentOptions);
      },
      error: (error) => {
        console.error('Error fetching departments', error);
      },
      complete: () => {
        console.log('Department fetching completed');
      }
    });
  }


  getJobs(): void {
    this.customService.getJobs().subscribe({
      next: (jobs:Job[]) => {
        this.jobOptions = jobs.map((job) => job.jobTitle);
        console.log(this.jobOptions);
      },
      error: (error) => {
        console.error('Error fetching jobs', error);
      },
      complete: () => {
        console.log('Jobs fetching completed');
      }
    })
  }












}
