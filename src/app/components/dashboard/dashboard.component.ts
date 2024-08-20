import {Component, OnInit} from '@angular/core';
import {ConfirmationService, ConfirmEventType, MenuItem, MessageService} from "primeng/api";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {ToastModule} from "primeng/toast";
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {AvatarModule} from "primeng/avatar";
import {TableModule} from "primeng/table";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {InputSwitchModule} from "primeng/inputswitch";
import {SplitButtonModule} from "primeng/splitbutton";
import {SpeedDialModule} from "primeng/speeddial";
import {InputTextModule} from "primeng/inputtext";
import {NgIf} from "@angular/common";
import {DropdownModule} from "primeng/dropdown";
import {Router} from "@angular/router";
import {CustomService} from "../../services/custom.service";
import {Employee} from "../../models/employee";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [
    DialogModule,
    AvatarModule,
    TableModule,
    ToastModule,
    ConfirmDialogModule,
    FormsModule,
    InputSwitchModule,
    SplitButtonModule,
    SpeedDialModule,
    InputTextModule,
    ReactiveFormsModule,
    NgIf,
    DropdownModule
  ],
  providers: [MessageService, ConfirmationService]
})
export class DashboardComponent implements OnInit {
  employees: Employee[] = [];


  value: any;
  employeeForm: FormGroup | any;

  constructor(private fb: FormBuilder,
              private _customService: CustomService,
              private _router: Router,
              private confirmationService: ConfirmationService,
              private messageService: MessageService) {

  }

  ngOnInit(): void {

    this.employeeForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      job: ['', [Validators.required]],
      department: ['', [Validators.required]]
    })

    this.getAllEmployees();

  }


  onClickAddNewEmployee() {
    this._router.navigate(['add-new-employee'])
  }

  getAllEmployees() {
    this._customService.getAllEmployees().subscribe({
      next: (data: Employee[]) => {
        this.employees = data;
        console.log("Fetched employees:", this.employees);
      },
      error: (err) => {
        console.error("Error occurred while fetching employees:", err);
      },
      complete: () => {
        console.log("Successfully fetched all employees.");
      }
    });
  }


  deleteEmployee(id: number) {
    this._customService.deleteEmployee(id).subscribe({
      next: (data) => {
        console.log("Employee deleted successfully.", data);
        this.getAllEmployees();
      },
      error: (error) => {
        console.log("Error occurred while deleting employee.")
        console.log(error)
      },
      complete: () => {
        console.log("Employee deleted successfully.");
      }
    })
  }




}



