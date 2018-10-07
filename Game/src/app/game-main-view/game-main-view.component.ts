import { Component, OnInit, AfterViewInit } from '@angular/core';
import { InputHandler } from '../Clases/input-handler';
import { BoardController } from '../Clases/board-controller';
import { HostListener } from '@angular/core';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { ConnectioncontrollerService } from '../Services/connectioncontroller.service';

@Component({
  selector: 'app-game-main-view',
  templateUrl: './game-main-view.component.html',
  styleUrls: ['./game-main-view.component.css']
})
export class GameMainViewComponent implements OnInit,AfterViewInit {

  public head:string;
  public message: string;

  private userName: string;
  private tankImagePath: string;

  private inputHandler: InputHandler;
  private boardController: BoardController;

  @ViewChild('canvas') canvas: ElementRef;

  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    console.log(event);
    alert(JSON.stringify(this.inputHandler.getAction(event.keyCode)));
  }
  
  constructor(private dataExchangerController: ConnectioncontrollerService) { 
    this.tankImagePath="../../assets/Images/Tanks/Red/redTank.png";
    this.userName= localStorage.getItem("userName");
    this.inputHandler= new InputHandler();
    
  }

  ngOnInit() {
    this.dataExchangerController.messageObserver.subscribe(msg => {
      console.log("web service emitió un mensaje");
      console.log(msg);
    });
  }

  ngAfterViewInit() {
    this.boardController= new BoardController(this.canvas.nativeElement,500,500);
  }

  send(){
    this.sendMessage(this.head,this.message);
  }
  sendMessage(head:string ,data:Object){
    this.dataExchangerController.sendMsg(head,data);
  }

}
