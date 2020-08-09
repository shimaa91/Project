import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private router: Router, private tokenService: TokenService) { }
    canActivate(): boolean {
        let logged = this.tokenService.hasAccessToken();
        if (logged)
            return true;
        else {         
            this.router.navigateByUrl('/login');                     
            return false;
        }
      }
    }