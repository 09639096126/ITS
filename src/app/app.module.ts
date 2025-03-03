import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatTableModule } from "@angular/material/table";
import { BrowserModule } from "@angular/platform-browser";
import { OAuthModule } from "angular-oauth2-oidc";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AdminLoginComponent } from "./admin_components/admin-login/admin-login.component";
import { DashboardComponent } from ".//admin_components/dashboard/dashboard.component";
import { AddEditEventsComponent } from ".//admin_components/gad-events/add-edit-events/add-edit-events.component";
import { GadEventsComponent } from "./admin_components/gad-events/gad-events.component";
import { ShowEventsComponent } from ".//admin_components/gad-events/show-events/show-events.component";
import { LoginComponent } from "./admin_components/login/login.component";
import { AddEditRegComponent } from "./admin_components/register/add-edit-reg/add-edit-reg.component";
import { RegisterComponent } from "./admin_components/register/register.component";
import { ShowRegComponent } from "./admin_components/register/show-reg/show-reg.component";
import { AddEditRepoComponent } from "./admin_components/repository/add-edit-repo/add-edit-repo.component";
import { RepositoryComponent } from "./admin_components/repository/repository.component";
import { ShowRepoComponent } from "./admin_components/repository/show-repo/show-repo.component";

import { SidenavComponent } from "./admin_components/sidenav/sidenav.component";
import { ContactComponent } from "./users_components/contact/contact.component";

import { HeaderComponent } from "./users_components/header/header.component";
import { MainComponent } from "./users_components/main/main.component";
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import {MatStepperModule} from '@angular/material/stepper';
import {MatSidenavModule} from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from "ngx-toastr";
import { AdmAssetsComponent } from './admin_components/adm-assets/adm-assets.component';
import { ShowAssetsComponent } from './admin_components/adm-assets/show-assets/show-assets.component';
import { AddEditAssetsComponent } from './admin_components/adm-assets/add-edit-assets/add-edit-assets.component';
import { EndUserAssetsComponent } from './users_components/end-user-assets/end-user-assets.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    HeaderComponent,
    
    SidenavComponent,
    ContactComponent,
    DashboardComponent,
    GadEventsComponent,
    
   HeaderComponent,
    RegisterComponent,
    AdminLoginComponent,
    RepositoryComponent,
    AddEditRepoComponent,
    ShowRepoComponent,
    
    ShowRegComponent,
    AddEditRegComponent,
    AddEditEventsComponent,
    ShowEventsComponent,
    AdmAssetsComponent,
    ShowAssetsComponent,
    AddEditAssetsComponent,
    EndUserAssetsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    //Auth
    OAuthModule.forRoot(),
    HttpClientModule,
    //Material
    MatSidenavModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule ,
    MatListModule,
    MatMenuModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatTableModule,
    MatButtonModule,
    MatStepperModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    ToastrModule.forRoot({
      timeOut: 1000,
      extendedTimeOut: 1000,
      closeButton: true,
      progressBar: true,
      progressAnimation: 'increasing',
      positionClass: 'toast-top-center',
    }),

    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
