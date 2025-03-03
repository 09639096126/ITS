import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'; // ✅ Import HttpClient
import { Observable, lastValueFrom } from 'rxjs'; // ✅ Convert Observable to Promise
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root',
})
export class AuthGoogleService {
  public isLoading = false; // ✅ Show loading state
  readonly APIUrl = 'http://its-rho.vercel.app:5000/api/User/check-email';

  constructor(
    private toastr: ToastrService,
    private oauthService: OAuthService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private http: HttpClient // ✅ Inject HttpClient
  ) {
    this.initLogin();
  }

  async initLogin() {
    const config: AuthConfig = {
      issuer: 'https://accounts.google.com',
      strictDiscoveryDocumentValidation: false,
      clientId:
        '693611222238-rmrnu8v3j3cc5uj4k22sdsqgk6tkenr8.apps.googleusercontent.com',
      redirectUri: window.location.origin + '/admin/(secondary:dashboard)',
      scope: 'openid profile email',
    };

    this.oauthService.configure(config);
    this.oauthService.setupAutomaticSilentRefresh();
    this.oauthService.loadDiscoveryDocumentAndTryLogin().then(() => {
      this.checkEmail();
    });
  }

  login() {
    this.oauthService.initLoginFlow();
  }

  logout() {
    this.oauthService.logOut();
    this.router.navigate(['/login']);
  }

  getProfile() {
    return this.oauthService.getIdentityClaims();
  }
  getUserAssets(email: string): Observable<any[]> {
    return this.http.get<any[]>(
      `http://its-rho.vercel.app/api/User/user-assets?email=${email}`
    );
  }

  private async checkEmail() {
    this.spinner.show();

    const claims = this.oauthService.getIdentityClaims();
    if (!claims || !claims['email']) {
      this.handleAuthError('No email found in identity claims.');
      return;
    }

    const userEmail = claims['email'];
    console.log('🔍 Checking email:', userEmail);

    try {
      const response: any = await lastValueFrom(
        this.http.post(this.APIUrl, { email: userEmail })
      );

      if (response.exists) {
        console.log('✅ Authorized email:', userEmail);

        // Store email & role locally for quick access
        localStorage.setItem('userEmail', userEmail);
        localStorage.setItem('userRole', response.roleId);

        if (response.roleId === 1) {
          await this.router.navigate(
            ['/admin', { outlets: { secondary: ['dashboard'] } }],
            { replaceUrl: true }
          );
        } else if (response.roleId === 2) {
          await this.router.navigate(['/main'], { replaceUrl: true });
        } else {
          this.handleAuthError('Unknown role detected. Contact admin.');
        }
      } else {
        this.handleAuthError(
          'Your email is not authorized to access this system.'
        );
      }
    } catch (error) {
      this.handleAuthError('Server error. Please try again later.', error);
    }
  }

  private handleAuthError(message: string, error: any = null) {
    this.toastr.error(message, 'Access Denied');
    console.error(`❌ ${message}`, error);
    this.logout();
    this.spinner.hide();
  }
}
