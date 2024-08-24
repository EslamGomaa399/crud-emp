import {Injectable} from "@angular/core";
import {CanActivate, Router} from "@angular/router";
import {AuthService} from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  isValid: boolean =false;

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

  validateToken(){
    this.authService.validateToken().subscribe({
      next:(res) => {
        console.log(res);
        this.isValid = res.isValid;
      },
      error:(err) => {
        console.log(err)
      },
      complete: () => {
        console.log("completed successfully <><> ")
      }
    });
  }


}
