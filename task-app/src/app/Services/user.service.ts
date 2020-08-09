import { Injectable } from '@angular/core';
import { ApiService } from '../SharedServices/api.service';
import {  ManageUserViewModel } from '../ViewModels/UserCreateViewModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private apiService:ApiService) { }
  getAllUsers(){
    console.log("inservice");
    return  this.apiService.get(`/api/User/GetAll`);
  }

  getUserDetails(UserId){
    return  this.apiService.get(`/api/User/Get?UserId=${UserId}`);
  }

  CreateUser(model:ManageUserViewModel )
  {
    console.log(model)
    return  this.apiService.post(`/api/User/Create`,model);
  }

  EditUser(model:ManageUserViewModel)
  {
    return  this.apiService.update(`/api/User/Update`,model);
  }

  DeleteUser(UserId)
  {
    return  this.apiService.remove(`/api/User/Delete?UserId=${UserId}`);

  }
}
