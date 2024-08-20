import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddNewEmployeeRoutingModule } from './add-new-employee-routing.module';
import { AddNewEmployeeComponent } from './add-new-employee.component';
import {Button} from "primeng/button";
import {DropdownModule} from "primeng/dropdown";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {CountryDropdownComponent} from "../../shared/country-dropdown/country-dropdown.component";
import {CalendarModule} from "primeng/calendar";
import {ToastModule} from "primeng/toast";
import {AppModule} from "../../app.module";


@NgModule({
  declarations: [
    AddNewEmployeeComponent
  ],
  imports: [
    CommonModule,
    AddNewEmployeeRoutingModule,
    Button,
    DropdownModule,
    FormsModule,
    InputTextModule,
    ReactiveFormsModule,
    CountryDropdownComponent,
    CalendarModule,
    ToastModule,
    AppModule
  ]
})
export class AddNewEmployeeModule { }
