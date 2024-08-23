import {Component, OnInit} from '@angular/core';
import {NgIf} from "@angular/common";
import {Ripple} from "primeng/ripple";
import {Button, ButtonDirective} from "primeng/button";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {NgxUiLoaderService} from "ngx-ui-loader";
import {ToastModule} from "primeng/toast";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [
    NgIf,
    Ripple,
    ButtonDirective,
    Button,
    ReactiveFormsModule,
    ToastModule
  ],
  styleUrls: ['./login.component.css'],
  providers:[MessageService]
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup | any;

  constructor(private authService: AuthService,
              private router: Router,
              private messageService: MessageService,
              private ngxUiLoaderService: NgxUiLoaderService) {
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username:new FormControl(null, Validators.required),
      password:new FormControl(null, Validators.required)
    });

  }


  login() {

    this.ngxUiLoaderService.start();

    const loginFormValue = this.loginForm.value;
    const user = {
      username:loginFormValue.username,
      password:loginFormValue.password
    }

    this.authService.login(user).subscribe({
      next: (res)=> {
        console.log(res);
        localStorage.setItem('token', res.accessToken);
      },
      error: (error)=> {
        console.log(error);
        this.ngxUiLoaderService.stop();
        this.showError();
      },
      complete: ()=> {
        console.log("Successfully logged in ... ")
        this.ngxUiLoaderService.stop();
        this.showSuccess();
        this.router.navigate(['/dashboard'])

      }
    })
  }


  showSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User login successfully ...' });
  }

  showError() {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Username or password is incorrect' });
  }



}
