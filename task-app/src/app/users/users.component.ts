import { Component, OnInit,Injectable } from '@angular/core';
import { throwMatDuplicatedDrawerError } from '@angular/material/sidenav';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import{ManageUserViewModel} from  '../ViewModels/UserCreateViewModel';
import{UserViewModel} from  '../ViewModels/UserViewModel';

import {
  NgbDateStruct, NgbCalendar, NgbDatepickerI18n
} from '@ng-bootstrap/ng-bootstrap';

import{UserService}from '../Services/user.service';
import { ResultViewModel } from '../ViewModels/result-view-models';
import { DatePipe, JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';


const WEEKDAYS = ['ن', 'ث', 'ر', 'خ', 'ج', 'س', 'ح'];

 const MONTHS = ['يناير','فبراير','مارس','ابريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر']
@Injectable()
export class ArabicI18n extends NgbDatepickerI18n {

  getWeekdayShortName(weekday: number) {
    return WEEKDAYS[weekday-1];
  }

  getMonthShortName(month: number) {
    return MONTHS[month-1];
  }
  getMonthFullName(month: number) {
    return MONTHS[month-1];
  }
  getDayAriaLabel(date: NgbDateStruct): string {
    return `${date.day}-${date.month}-${date.year}`;
  }
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [    
    {provide: NgbDatepickerI18n, useClass: ArabicI18n}
  ]
})
export class UsersComponent implements OnInit {

  constructor( private modalService: NgbModal,
    private datePipe: DatePipe,private formBuilder: FormBuilder,private calendar: NgbCalendar
    ,private  userService:UserService,private http: HttpClient,private toastr: ToastrService) { }
  ManageUser:string="إضافة  مستخدم  جديد";
  model:ManageUserViewModel;  
  Users:any;
closeResult: string;  
arrows:any;
birthdate:Date;
selectToday() {
  this.userForm.controls["BirthDate"].setValue(this.calendar.getToday().year-50);
}
ngOnInit(): void {
  this.GetAllUsers();
  this.model=new  ManageUserViewModel();
  this. createForm();
}

  OpenAddUser(UserContent,model) {           
    if(model!=null)
    {
       this.ManageUser="تعديل بيانات المستخدم";       
      this.model=model;      
      this.birthdate=new  Date(model.birthdate)         
      this.userForm = this.formBuilder.group({
        ID:[model.userID],
        FullName: [model.fullName, [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
        BirthDate: [{year:this.birthdate.getFullYear(),month:this.birthdate.getMonth()+1,day:this.birthdate.getDate()},Validators.required ],
        Gender: [model.gender.toString(), [Validators.required]]          
      });

      console.log(this.userForm.value);
    }
    else
    {
      this.ManageUser="إضافة  مستخدم  جديد";
        this.model=new  ManageUserViewModel();
        this.createForm();      
    }
    this.modalService.open(UserContent).result.then(
      result => {
        this.closeResult = `Closed with: ${result}`;
      },
      reason => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }
  userForm: FormGroup;
  createForm() {     
    console.log(this.model);       
    this.userForm = this.formBuilder.group({
      ID:[this.model.UserId],
      FullName: [this.model.FullName, [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      BirthDate: [this.model.BirthDate,Validators.required ],
      Gender: [this.model.Gender, [Validators.required]]          
    });
    console.log(this.userForm.value);
  }  
  AddOrEditUser()
  {
    if(this.model.UserId==0)
    {      
      this.model.FullName=this.userForm.controls['FullName'].value;
      let date=this.userForm.controls['BirthDate'].value;
      var Gender:number=this.userForm.controls['Gender'].value;
      this.model.BirthDate=this.datePipe.transform(new Date(date.year,date.month-1,date.day),'yyyy-MM-dd');
      this.model.Gender=Number(Gender);
      console.log(this.model);     
      this.userService.CreateUser(this.model).subscribe(result=>{
        if(result.isSuccess)
        {
          this.toastr.success("تم إضافة مستخدم  جديد  بنجاح!");
          this.GetAllUsers();
        }
      },error=>{
        console.log(error);
      });
     
    }
    else
    {      
      this.model.FullName=this.userForm.controls['FullName'].value;
      let date=this.userForm.controls['BirthDate'].value;
      var Gender:number=this.userForm.controls['Gender'].value;
      this.model.BirthDate=this.datePipe.transform(new Date(date.year,date.month-1,date.day),'yyyy-MM-dd');
      this.model.Gender=Number(Gender);
      console.log(this.model);     
      this.userService.EditUser(this.model).subscribe(result=>{
        if(result.isSuccess)
        {
          this.toastr.success("تم تعديل المستخدم بنجاح!");
          this.GetAllUsers();
        }
      },error=>{
        console.log(error);
      });
    }        
  }
  result:ResultViewModel;
  GetAllUsers()
  {
    this.userService.getAllUsers().subscribe(res=>{
      console.log(res);
      this.result=res;
      console.log(this.result)
      console.log(this.result.isSuccess)
      if(this.result.isSuccess==true)
      {        
        this.Users=this.result.data;
        console.log(this.Users);
      }
    },error=>{
      console.log(error);      
    });
    
  }

  OpenDeleteUser(Deletecontent,user)
  {    
    this.model=user;
    this.model.UserId=user.userID;
    this.modalService.open(Deletecontent).result.then(
      result => {
        this.closeResult = `Closed with: ${result}`;
      },
      reason => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }
  DeleteUser()
  {
    this.userService.DeleteUser(this.model.UserId).subscribe(result=>{
      if(result.isSuccess)
      {
        this.toastr.success("تم مسح المستخدم بنجاح!");
        this.GetAllUsers();
      }
    },error=>{
      console.log(error);
    })
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }


 

}
