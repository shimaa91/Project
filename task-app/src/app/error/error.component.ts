import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';
@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,private  location:Location) { }
MessageError:string;
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(parms => {
      this.MessageError = parms.get('code');
    });
  }

  GoBack(){
    this.location.back();
  }

}
