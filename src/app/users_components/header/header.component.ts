import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGoogleService } from '../../../services/auth-google.service';
import { ThemeService } from '../../../services/them/theme.service';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{

  @Output() filterChanged = new EventEmitter<string>();

  onFilterChange(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.filterChanged.emit(filterValue);
    
  }
  picture: string | null = null;
  email: string | null = null;
Home: any;

constructor( private authGoogleService: AuthGoogleService,     private router: Router,private themeService: ThemeService){

}
ngOnInit() {
  this.loadProfile(); // Initial load
  const intervalId = setInterval(() => {
    this.loadProfile(); // Load once after 100ms
    clearInterval(intervalId); // Stop the interval after the first execution
  }, 100);
  
  

}

toggleDark(): void {
  this.themeService.toggleDarkMode();
}

toggleMarron(): void {
  this.themeService.toggleMarronMode();
}
showData(){
    const data = JSON.stringify(this.authGoogleService.getProfile())
    console.log(data);
    alert(data)

}
logOut(){
  this.authGoogleService.logout()
  this.router.navigate(['login']);
}

loadProfile() {
  const claims: any = this.authGoogleService.getProfile();
  if (claims) {
    this.picture = claims.picture || null;
    this.email = claims.email || null;
    console.log('User email:', this.email);

  } else {
    console.log('No user profile available.');
  }
}





}
