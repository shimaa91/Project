import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginModule } from './login/login.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
// import{HomeModule}  from  './home/home.module';
import{MatSidenavModule}from  '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { ColorPickerModule } from 'ngx-color-picker';
import{SidemenuComponent}  from  './layout/sidemenu/sidemenu.component';
import{HeaderComponent}from'./layout/header/header.component';
import{LayoutComponent}from  './layout/layout.component';  
import { ToastrModule } from 'ngx-toastr';
import  {ErrorModule} from  './error/error.module'
import { from } from 'rxjs';
@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,SidemenuComponent,HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LoginModule,
    NgbModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,    
    HttpClientModule,
    MatSidenavModule,
    MatSidenavModule,MatToolbarModule,MatListModule,
    ColorPickerModule,
    ToastrModule.forRoot(),
    ErrorModule
    //HomeModule    
  ],schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
