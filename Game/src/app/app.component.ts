import { Component } from '@angular/core';
import { ConnectioncontrollerService } from './Services/connectioncontroller.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Game';

  public head:string;
  public message: string;

  constructor(private dataExchangerController: ConnectioncontrollerService){

  }

  ngOnInit(){
    this.dataExchangerController.messageObserver.subscribe(msg => {
      console.log("web service emitió un mensaje");
      console.log(msg);
    });
  }

  send(){
    this.sendMessage(this.head,this.message);
  }
  sendMessage(head:string ,data:Object){
    this.dataExchangerController.sendMsg(head,data);
  }

}