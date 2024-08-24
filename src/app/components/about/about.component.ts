import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  standalone: true,
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.validateToken()
  }


  validateToken(){
    this.authService.validateToken().subscribe({
      next:(res) => {
        console.log(res.isValid)
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
