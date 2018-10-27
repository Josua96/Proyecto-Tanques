import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css']
})
export class MainViewComponent implements OnInit, AfterViewInit{

  
  public userName: string="";
  public userNameLength: number=5;

  constructor() { 

    let audio = new Audio();
		audio.src= "../../assets/Sounds/level_start.wav";
		audio.load();
		audio.play();
  }

  

  ngOnInit() {
  }

  ngAfterViewInit(): void {
  
  }

  

  goToGame(){
    if (this.userName.length > this.userNameLength )
    {
      localStorage.setItem("userName", this.userName);      
      window.location.href='gameMainView';
    }
    else{
      alert("El alias debe tener más de 5 caracteres"); 
    }
    
  }

}
