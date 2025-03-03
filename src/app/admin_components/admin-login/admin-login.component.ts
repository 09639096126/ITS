import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AldminloginService } from '../../../services/adminServices/adminlogin.service';

@Component({
  selector: 'app-admin-login',
  standalone: false,
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.scss'
})
export class AdminLoginComponent {
  username: string = '';
  password: string = '';
  loginMessage: string = '';

  constructor(private authService: AldminloginService, private router: Router) {}

  onLogin(): void {
    console.log("Logging in with:", this.username, this.password);
    this.authService.login(this.username, this.password).subscribe(
      (response) => {
        console.log("Login successful:", response);
        this.loginMessage = 'Login successful!';
        
        // Assuming the response contains the user's role (e.g., { role: 'admin' } or { role: 'user' })
        const role = response.role;

        if (role === 'Admin') {
          // Admin navigation
          this.router.navigate(['/admin', { outlets: { secondary: ['dashboard'] } }]);
        } else if (role === 'User') {
          // Regular user navigation
          this.router.navigate(['/main']);
        } else {
          // Handle unexpected role or no role (error case)
          this.loginMessage = 'Role not assigned or invalid role.';
        }
      },
      (error) => {
        console.error("Login error:", error);
        this.loginMessage = 'Invalid username or password.';
      }
    );
  }
}

