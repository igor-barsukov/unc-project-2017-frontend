import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';
import {ChatTravel} from '../models/chat-travel.interface';


export class ChatService {

  private url = 'http://localhost:5000';
  private socket;


  sendMessage(obj: ChatTravel){
    this.socket.emit('add-message', ChatTravel);
  }


  getMessages() {
    const observable = new Observable(observer => {
      this.socket = io(this.url);
      this.socket.on('message', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }
}
