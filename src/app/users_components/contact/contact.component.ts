import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthGoogleService } from '../../../services/auth-google.service';
import emailjs from 'emailjs-com';
@Component({
  selector: 'app-contact',
  standalone: false,
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent  implements OnInit{

  ngOnInit(): void {
    this.loadProfile()
  }
  incidentForm: FormGroup;
  email: string | null = null;
  constructor(
    private fb: FormBuilder,
    private authGoogleService: AuthGoogleService

  ) {
    this.incidentForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      incidentDate: ['', Validators.required],
      details: ['', Validators.required]
    });
  }

  submitForm() {
    if (this.incidentForm.valid) {
      const templateParams = {
        fullName: this.incidentForm.value.fullName,
        email: this.incidentForm.value.email,
        incidentDate: this.incidentForm.value.incidentDate,
        details: this.incidentForm.value.details
      };

      // Replace with your EmailJS service ID, template ID, and user ID
emailjs.send('service_mk9mmws', 'template_pvvaxvf', templateParams, 'G5hXul6GvkQYGjV3i')
.then(() => {
          alert('Incident report submitted successfully.');
          this.incidentForm.reset(); // Reset the form after successful submission
        }, (error) => {
          alert('Failed to submit the incident report: ' + JSON.stringify(error));
        });
    }
  }

  loadProfile() {
    const claims: any = this.authGoogleService.getProfile();
    if (claims) {
      this.email = claims.email || null;
      console.log('User email:', this.email);
  
      // Automatically populate the email field in the form
      this.incidentForm.patchValue({
        email: this.email
        
      }
    );
    } else {
      console.log('No user profile available.');
    }
  }
  
}
