import { NONE_TYPE } from '@angular/compiler';
import { Component } from '@angular/core';
import { webSocket, WebSocketSubject  } from "rxjs/webSocket";



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  title = 'AngularWebsocketTutorial';
  subject: any = NONE_TYPE;
  constructor() {
    this.connect()
  }

  private connect() {
    this.subject = this.getNewWebScket();
    this.subject.subscribe(
      msg => this.onMesage(msg),
      err => this.onError(err),
      () => this.onComplete()
    );
    this.subject.next({"token":"............"});
    console.log("connected, subscribe ok")
  }

  private getNewWebScket() {
    return webSocket({
      url: "ws://localhost:80/message_ws",
      closeObserver: {
        next: () => {
          console.log('websocket connection closed, reconnect...');
          this.connect();
        }
      },
    });
  }

  onMesage(msg : any): void {
    console.log('onMesage received: ' + msg)
    if("OK" == msg.status) {
      if(msg.data) {
        for(var idx in msg.data) {
          console.log(JSON.stringify(msg.data[idx]))
        }
      }
    }
  }

  onError(err : any): void {
    console.log('onError:' + JSON.stringify(err))
  }

  onComplete() : void{
    console.log('complete')
  }
}
