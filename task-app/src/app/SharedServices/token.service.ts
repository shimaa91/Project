import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  tokenStorageName: string = "userToken";
  userfullNameStorageName: string = "userFullName";
  constructor() { }

  setToken(token: string) {
    localStorage.setItem(this.tokenStorageName,"Bearer "+token);
  }

  getToken() {
    let token: string = localStorage.getItem("userToken");
    // alert("token"+token)
    if (token == null || token == 'undefined') {
      return "";
    }
    return token;
  }

  setUserfullName(name: string) {
    localStorage.setItem(this.userfullNameStorageName, name);
  }

  getUserfullName() {
    let name: string = localStorage.getItem(this.userfullNameStorageName);
    // alert("token"+token)
    if (name == null || name == 'undefined') {
      return "";
    }
    return name;
  }

  hasAccessToken(): boolean {
    return (localStorage.getItem("userToken") != null && localStorage.getItem("userToken").length > 0)
}
  removeToken() {
    
    localStorage.setItem(this.tokenStorageName, "");
    localStorage.removeItem(this.tokenStorageName);
  }

}
