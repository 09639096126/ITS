
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './admin_components/login/login.component';
import { AdminLoginComponent } from './admin_components/admin-login/admin-login.component';
import { MainComponent } from './users_components/main/main.component';

import { ContactComponent } from './users_components/contact/contact.component';
import { AuthGuard } from '../auth.guard';
import { SidenavComponent } from './admin_components/sidenav/sidenav.component';
import { DashboardComponent } from './admin_components/dashboard/dashboard.component';
import { GadEventsComponent } from './admin_components/gad-events/gad-events.component';
import { RepositoryComponent } from './admin_components/repository/repository.component';
import { RegisterComponent } from './admin_components/register/register.component';
import { AdmAssetsComponent } from './admin_components/adm-assets/adm-assets.component';
import { EndUserAssetsComponent } from './users_components/end-user-assets/end-user-assets.component';

const routes: Routes = [
  // 🌐 Public Routes
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'admin-log', component: AdminLoginComponent },

  // 🎓 Student Routes
  { path: 'main', component: MainComponent }, 
  { path: 'UserAsset', component: EndUserAssetsComponent },
  { path: 'contact', component: ContactComponent },
  
  // 🛡️ Admin Routes with Secondary Outlet
  {
    path: 'admin',
    component: SidenavComponent,
    children: [
      { path: '', component: SidenavComponent , }, // Default Admin View
      { path: 'dashboard', component: DashboardComponent, outlet: 'secondary'},
      { path: 'Assets', component: AdmAssetsComponent, outlet: 'secondary'},
      { path: 'admin-repo', component: RepositoryComponent, outlet: 'secondary'},
      { path: 'admin-register', component: RegisterComponent, outlet: 'secondary'},
    ],
  },

  // 🚨 Fallback Route
  { path: '**', redirectTo: '/login' } // Redirect unknown paths to login
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

