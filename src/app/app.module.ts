import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {Button} from "primeng/button";
import {HeaderComponent} from "./components/header/header.component";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DataViewModule} from "primeng/dataview";
import {InputTextModule} from "primeng/inputtext";
import {TableModule} from "primeng/table";
import {RippleModule} from "primeng/ripple";
import {ToastModule} from "primeng/toast";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {DialogModule} from "primeng/dialog";
import {AvatarModule} from "primeng/avatar";
import {RouterLink, RouterModule, RouterOutlet, Routes} from "@angular/router";
import {HomeComponent} from "./components/home/home.component";
import {AboutComponent} from "./components/about/about.component";
import {ContactComponent} from "./components/contact/contact.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {LoginComponent} from "./components/login/login.component";
import {AddNewEmployeeComponent} from "./components/add-new-employee/add-new-employee.component";
import {AddNewEmployeeModule} from "./components/add-new-employee/add-new-employee.module";
import {EmployeeDetailsComponent} from "./components/employee-details/employee-details.component";
import { CountryDropdownComponent } from './shared/country-dropdown/country-dropdown.component';
import {DropdownModule} from "primeng/dropdown";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { LoaderComponent } from './shared/loader/loader.component';
import {NgxUiLoaderConfig, NgxUiLoaderModule} from "ngx-ui-loader";

const routes:Routes = [
  ({path: 'home', component:HomeComponent}),
  {path: 'about', component:AboutComponent},
  {path: 'contact', component:ContactComponent},
  {path: 'dashboard',component:DashboardComponent},
  {path: 'login', component:LoginComponent},
  {path: 'add-new-employee', component:AddNewEmployeeComponent},
  {path: 'employee-details', component:EmployeeDetailsComponent}
]

const ngxUiLoaderConfig:NgxUiLoaderConfig  = {
  fgsColor: '#007bff', // Spinner color
  fgsType: 'ball-spin', // Spinner type
  fgsSize: 80, // Size of the spinner
  overlayColor: 'rgba(40, 40, 40, 0.8)', // Overlay color
  pbColor: 'red', // Progress bar color (if enabled)
  hasProgressBar: true, // Show progress bar
  text: 'Loading...', // Text to show below spinner
  textColor: '#FFFFFF',
}



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoaderComponent,
  ],
  imports: [
    BrowserModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    CommonModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,
    DataViewModule,
    InputTextModule,
    TableModule,
    RippleModule,
    TableModule,
    Button,
    ToastModule,
    ConfirmDialogModule,
    DialogModule,
    AvatarModule,
    RouterOutlet,
    RouterLink,
    RouterModule.forRoot(routes),
    DropdownModule,
    CountryDropdownComponent,
    HttpClientModule
  ],
  providers: [],
  exports: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
