import { Injectable } from '@angular/core';
import { Subject, Observer, Observable } from 'rxjs/Rx';

@Injectable()
export class SocketService {

  public createWebsocket(): Subject<MessageEvent> {

    let socket = new WebSocket('ws://' + window.location.host + '/sub');

    let observable = Observable.create(
      (observer: Observer<MessageEvent>) => {
        socket.onmessage = observer.next.bind(observer);
        socket.onerror = observer.error.bind(observer);
        socket.onclose = observer.complete.bind(observer);
      }
    );

    let observer = {
      next: (data: Object) => {
        if (socket.readyState === WebSocket.OPEN) {
          socket.send(JSON.stringify(data));
        }
      }
    };

    return Subject.create(observer, observable);
  }

}
