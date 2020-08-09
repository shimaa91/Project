import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import{MatCardModule} from  '@angular/material/card';
import{MatInputModule}  from  '@angular/material/input';
import{MatFormFieldModule}  from  '@angular/material/form-field';
import{MatRadioModule}from  '@angular/material/radio'
import{ReactiveFormsModule,FormsModule}from  '@angular/forms';
import {NgbPaginationModule, NgbAlertModule,NgbDatepickerModule,NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { from } from 'rxjs';
@NgModule({
  declarations: [UsersComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MatCardModule,MatInputModule,
    MatFormFieldModule,MatRadioModule,
    NgbModule,
    NgbDatepickerModule,ReactiveFormsModule,
    FormsModule
  ],schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [DatePipe],
})
export class UsersModule { }
