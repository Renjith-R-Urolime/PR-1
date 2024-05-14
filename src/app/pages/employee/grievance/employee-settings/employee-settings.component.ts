import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employee-settings',
  templateUrl: './employee-settings.component.html',
  styleUrls: ['./employee-settings.component.scss']
})
export class EmployeeSettingsComponent implements OnInit {

  constructor() { }
  cardList = [
    {
      'setting-icon': './assets/media/icons/people-outline-emp.svg',
      'setting-name': 'Employee Type',
      'setting-info': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ',
      'setting-route': '/employee/employee-settings/types' 
      
    },
    {
      'setting-icon': './assets/media/icons/employee-status.svg',
      'setting-name': 'Employee Status',
      'setting-info': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ',
      'setting-route': '/employee/employee-settings/status'  
    },

    {
      'setting-icon': './assets/media/icons/grid-outline-emp.svg',
      'setting-name': 'Employee Category',
      'setting-info': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ',
      'setting-route': '/employee/employee-settings/employee-category'  
    },

    {
      'setting-icon': './assets/media/icons/document-text-outline-emp.svg',
      'setting-name': 'Document Type',
      'setting-info': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ',
      'setting-route': '/employee/employeeSettings/document-type'  
    },

    
    {
      'setting-icon': './assets/media/icons/bank-account.svg',
      'setting-name': 'Bank Account Type',
      'setting-info': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ',
      'setting-route': '/employee/employeeSettings/bank-account-type'
    },

    
    {
      'setting-icon': './assets/media/icons/payment-method-emp.svg',
      'setting-name': 'Payment Method',
      'setting-info': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ',
      'setting-route': '/employee/employeeSettings/payment-method'
    },

    {
      'setting-icon': './assets/media/icons/grade.svg',
      'setting-name': 'Grade',
      'setting-info': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ',
      'setting-route': '/employee/employeeSettings/grade' 
    },

    
    {
      'setting-icon': './assets/media/icons/briefcase-outline-emp.svg',
      'setting-name': 'Designation',
      'setting-info': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ',
      'setting-route': '/employee/employeeSettings/designation' 
    },
    // Add more card data objects as needed for a total of 6 cards.
  ];

  ngOnInit() {
  }

}
