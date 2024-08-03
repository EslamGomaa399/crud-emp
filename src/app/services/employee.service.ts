import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor() { }

  employees = [
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
    },
    {
      firstName: 'Michael',
      lastName: 'Johnson',
      email: 'michael.johnson@crud.com',
      job: 'Data Analyst',
      department: 'Analytics'
    },
    {
      firstName: 'Emily',
      lastName: 'Davis',
      email: 'emily.davis@crud.com',
      job: 'UX Designer',
      department: 'Design'
    },
    {
      firstName: 'David',
      lastName: 'Brown',
      email: 'david.brown@crud.com',
      job: 'Sales Executive',
      department: 'Sales'
    }
  ];



}
