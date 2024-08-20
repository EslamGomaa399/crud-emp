import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EmployeeService} from "../../services/employee.service";
import {CustomService} from "../../services/custom.service";
import {Department, Job} from "../../models/department";
import {COUNTRIES_CITIES} from "../../shared/countries-cities";
import {Employee} from "../../models/employee";
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";
import {NgxUiLoaderService} from "ngx-ui-loader";



@Component({
  selector: 'app-add-new-employee',
  templateUrl: './add-new-employee.component.html',
  styleUrl: './add-new-employee.component.scss',
  providers: [MessageService]

})
export class AddNewEmployeeComponent implements OnInit {

  jobOptions: Array<string> = [];
  departmentOptions: Array<string> = [];
  managersOptions :Array<string> = [];
  countriesOptions: Array<{ name: string, cities: string[] }> = COUNTRIES_CITIES.countries;
  citiesOptions: string[] = [];
  value: any;
  employeeForm: FormGroup | any;
  date1: Date | undefined;
  message: any;


  constructor(private fb: FormBuilder,
              private customService:CustomService,
              private messageService: MessageService,
              private router: Router,
              private ngxUiLoaderService: NgxUiLoaderService) {

  }

  ngOnInit(): void {

    this.getDepartments();
    this.getJobs();
    this.getAllManagersNames();


    this.employeeForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      jobTitle: ['', Validators.required],
      departmentName: ['', Validators.required],
      managerName: ['', Validators.required],
      country: ['', Validators.required],
      city: [{ value: '', disabled: true }, Validators.required], // Disable initially
      street: ['', Validators.required],
      postalCode: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      hireDate: ['', Validators.required],
      salary: ['', Validators.required],
    })

  }

  saveEmployee() {
    if (this.employeeForm.valid) {

      this.ngxUiLoaderService.start();

      const formValue = this.employeeForm.value;
      console.log(formValue)

      const employee: Employee = {
        firstName: formValue.firstName,
        lastName: formValue.lastName,
        email: formValue.email,
        phoneNumber: formValue.phoneNumber,
        hireDate: formValue.hireDate,
        jobTitle: formValue.jobTitle,
        salary: Number(formValue.salary),
        managerName: formValue.managerName,
        departmentName: formValue.departmentName,
        country: formValue.country.name,
        city: formValue.city,
        street: formValue.street,
        postalCode: formValue.postalCode
      };

      this.customService.addNewEmployee(employee).subscribe({
        next: (response) => {
          console.log('Employee saved successfully', response);
          this.router.navigate(['/dashboard']);
          this.showSuccess()
          this.resetForm();
        },
        error: (error) => {
          console.error('Error saving employee', error);
          this.showError(error.error.message);
          this.ngxUiLoaderService.stop();
        },
        complete: () => {
          console.log('Employee saved completed ');
          this.ngxUiLoaderService.stop();
        }
      });
    } else {
      // If the form is invalid, mark all controls as touched to show validation errors
      Object.keys(this.employeeForm.controls).forEach(key => {
        const control = this.employeeForm.get(key);
        control.markAsTouched();
      });
     }
  }

  showSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Employee saved successfully' });
  }

  showError(message:string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }



  resetForm() {
    this.employeeForm.reset();
  }

  getDepartments(): void {
    this.customService.getDepartments().subscribe({
      next: (departments: Department[]) => {
        this.departmentOptions = departments.map((dept) => dept.departmentName);
        console.log("departmentOptions : " + this.departmentOptions);
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
        console.log("jobOptions : " + this.jobOptions);
      },
      error: (error) => {
        console.error('Error fetching jobs', error);
      },
      complete: () => {
        console.log('Jobs fetching completed');
      }
    })
  }

  getAllManagersNames(){
    this.customService.getAllManagersNames().subscribe({
      next: (managers:string[]) => {
        this.managersOptions = managers;
        console.log("managersOptions : " + this.managersOptions)
      },
      error: (error) => {
        console.error('Error fetching managers', error);
      },
      complete: () => {
        console.log('Managers fetching completed');
      }
    })
  }


  onCountryChange(selectedCountry: { name: string, cities: string[] }): void {
    console.log("Selected Country: ", selectedCountry);

    this.citiesOptions = selectedCountry ? selectedCountry.cities : [];

    console.log("Cities for selected country: ", this.citiesOptions);

    // Enable or disable the city dropdown based on whether a country is selected
    if (this.citiesOptions.length > 0) {
      this.employeeForm.get('city').enable();
    } else {
      this.employeeForm.get('city').disable();
    }

    // Reset the city selection
    this.employeeForm.get('city').reset();
  }









}
