import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable,Subject } from 'rxjs';
import * as Rx from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class WebSocketService {

  private socketManager;

  constructor() {
    
   }
 
  public sendMessageToServer(messageHead: String, data: Object ){
    this.socketManager.emit(messageHead,data);
  }

  public connect(): Rx.Subject<MessageEvent> {

    this.socketManager = io(environment.ws_url);

    // We define our observable which will observe any incoming messages
    // from our socket.io server.
    let observable = new Observable(observer => {
        this.socketManager.on(environment.serverUpdateMessages.updateMessage, (data) => {
          console.log("Received message from Websocket Server")
          observer.next(data);

        })
        return () => {
          this.socketManager.disconnect();
        }
    });
    
    // We define our Observer which will listen to messages
    // from our other components and send messages back to our
    // socket server whenever the `next()` method is called.
    let observer = {
        next: (data: Object) => {
            this.socketManager.emit(environment.playerActions.join, JSON.stringify(data));
        }
    };

  
    // we return our Rx.Subject which is a combination
    // of both an observer and observable.
    return Rx.Subject.create(observer, observable);
  }

}
