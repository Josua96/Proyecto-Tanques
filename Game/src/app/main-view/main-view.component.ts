import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css']
})
export class MainViewComponent implements OnInit {

  public userName: string="";
  public userNameLength: number=5;

  constructor() { }

  ngOnInit() {
  }

  goToGame(){
    if (this.userName.length > this.userNameLength ){
      localStorage.setItem("userName", this.userName);
      window.location.href='gameMainView';
    }
    
  }

}
