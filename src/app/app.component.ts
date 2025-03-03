import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthGoogleService } from '../services/auth-google.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent  implements OnInit  {
  title = 'frontend';
 


    constructor(private spinner: NgxSpinnerService,private authGoogleService: AuthGoogleService) {}
  
    ngOnInit() {
      // Show the spinner when the component initializes
      this.spinner.show();
  
      // Hide the spinner after a delay (for demonstration purposes)
      setTimeout(() => {
        this.spinner.hide();
      }, 2000); // Adjust delay as needed
    }
  }