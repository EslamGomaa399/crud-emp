import {Injectable} from "@angular/core";
import {CanActivate, Router} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {Observable, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  isValid: boolean =false;

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.isLoggedIn().pipe(
      tap((isLoggedIn: boolean) => {
        if (!isLoggedIn) {
          this.router.navigate(['/login']);
        }
      })
    );
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
