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
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'Record deleted successfully' });
        this.getAllEmployees(); // Refresh the employee list after deletion
      },
      error: (error) => {
        console.error("Error occurred while deleting employee:", error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete record' });
      }
    });
  }


  confirmDelete(employee: Employee) {
    if (employee.employeeId !== undefined) {
      this.confirmationService.confirm({
        message: 'Do you want to delete this record?',
        header: 'Delete Confirmation',
        icon: 'pi pi-info-circle',
        acceptButtonStyleClass: "p-button-danger p-button-text",
        rejectButtonStyleClass: "p-button-text p-button-text",
        acceptIcon: "none",
        rejectIcon: "none",
        accept: () => {
          this.deleteEmployee(employee.employeeId!); // `!` asserts that the value is not undefined
        },
        reject: () => {
          this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
        }
      });
    } else {
      console.error("Employee ID is undefined. Cannot delete.");
    }
  }






}



