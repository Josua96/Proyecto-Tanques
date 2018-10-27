import { Injectable } from '@angular/core';
import { Observable, Subject} from 'rxjs';
import {map} from 'rxjs/operators';
import { WebSocketService } from '../Services/web-socket.service';

@Injectable({
  providedIn: 'root'
})
export class ConnectioncontrollerService {

  messageObserver: Subject<any>;
  socketService: WebSocketService;

  constructor() {
    this.socketService= new WebSocketService();
    
    this.messageObserver= <Subject<any>> this.socketService.connect().pipe(map((response: any): any => {
      return response; //retorna el observable
    }))
    
    
  }

    // Our simplified interface for sending
  // messages back to our socket.io server
  sendMsg(head: String , data:Object ) {
    this.socketService.sendMessageToServer(head, data);
  }

}
