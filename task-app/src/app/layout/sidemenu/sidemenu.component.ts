import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from 'src/app/SharedServices/token.service';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css']
})
export class SidemenuComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,private route: Router,private  tokenService:TokenService) { }
  BackGroundColor:string;
  events: string[] = [];
  opened: boolean=true;    
  ngOnInit(): void {
  }  

    ChangeBackgrond(color){     
      
      this.BackGroundColor=color;

    }

    logout()
    {
      this.tokenService.removeToken();
      this.route.navigateByUrl('/login');
    }
}
