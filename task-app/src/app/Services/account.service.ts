import { Injectable } from '@angular/core';
import { ApiService } from '../SharedServices/api.service';


@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private apiService: ApiService) { }

  login(model)
  {
    return  this.apiService.post(`/api/account/login`,model);
  }
    
}
