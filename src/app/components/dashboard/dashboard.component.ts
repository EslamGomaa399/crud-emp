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
  employees: Array<any> = [];


  value: any;
  employeeForm: FormGroup | any;

  constructor(private fb: FormBuilder, private _router: Router) {

  }

  ngOnInit(): void {

    this.employeeForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      job: ['', [Validators.required]],
      department: ['', [Validators.required]]
    })

    this.employees = [
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@crud.com',
        job: 'Software Engineer',
        department: 'Engineering'
      },
      {
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@crud.com',
        job: 'Product Manager',
        department: 'Management'
      }
    ];


  }




  onClickAddNewEmployee() {
    this._router.navigate(['add-new-employee'])
  }



}



