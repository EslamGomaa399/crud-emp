import {Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {DropdownModule} from "primeng/dropdown";

@Component({
  selector: 'app-country-dropdown',
  templateUrl: './country-dropdown.component.html',
  styleUrl: './country-dropdown.component.scss',
  standalone: true,
  imports: [FormsModule, DropdownModule]
})
export class CountryDropdownComponent implements OnInit {


  countries: any[] | undefined;

  selectedCountry:any;

  ngOnInit(): void {
  }
}
