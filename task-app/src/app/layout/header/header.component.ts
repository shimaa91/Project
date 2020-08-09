import { Component, OnInit,Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  color:any="white";
  constructor() { }
  @Output() public sidenavToggle = new EventEmitter();
  @Output() public BackgroundColor = new EventEmitter();
  ngOnInit(): void {
  }
  public onToggleSidenav = () => { 
    this.sidenavToggle.emit();
 
  }
  selectColor(){
    this.BackgroundColor.emit(this.color);
 //   alert(this.color);
  }

}
