import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService } from './chat.service';
import {Subscription} from 'rxjs/Rx';
import {ActivatedRoute} from '@angular/router';
import {HttpService} from '../services/http.service';
import {Response} from '@angular/http';
import { ChatTravel } from '../models/chat-travel.interface';
import { LocalStorageService } from 'angular-2-local-storage';
import {Trip} from '../models/trips.interface';
import {User} from '../models/user.interface';
import {Gender} from '../models/gender.interface';
import {Country} from '../models/country.interface';
import {City} from '../models/city.interface';
import {State} from '../models/state.interface';

export class ChatForm{
  id: number;
  sendTime: Date;
  travel: number;
  body: string;
  sender: string;
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  providers: [ChatService, HttpService]
})
export class ChatComponent implements OnInit, OnDestroy {
  date: Date;
  user: User;
  message: ChatTravel = new  ChatTravel(null, this.date, '', new Trip(), new User(null, '', '', '', '', '', new Gender('', ''), new City('', ''), ''));
  connection;
  messages: ChatTravel[] = [];
  private id: number;
  private routeSubscription: Subscription;

  constructor(private chatService: ChatService, private route: ActivatedRoute, private httpService: HttpService) {
    this.routeSubscription = route.params.subscribe(params => this.id = params['id']);
    this.date = new Date();
  }


  sendMessage() {
    this.chatService.sendMessage(this.message);
    this.httpService.sendChatMessage(this.message);
    //this.message = new ChatTravel(this.id, new Date(), '', new Trip(), new User(null, '', localStorage.getItem('firstName'), '', '', '', new Gender('', ''), new City('', ''), ''));
    //this.message.body = '';
    this.message.sendTime = new Date();
    this.message.sender = new User(parseInt(localStorage.getItem('id')), '', localStorage.getItem('firstName'), '', '', '', new Gender('', ''), new City('', ''), '');  // localStorage.getItem('firstName');
    this.message.id = this.id;
    this.message.travel = new Trip();
    this.message = new ChatTravel(this.message.id, this.message.sendTime, '', this.message.travel, this.message.sender);
  }


  ngOnInit() {

    /*this.chatForm = {
      id: null,
      sendTime: new Date(),
      body: '',
      travel: null,
      sender: ''
    };*/

    this.connection = this.chatService.getMessages().subscribe(message => {
      this.messages.push(this.message);
    });

   /* this.httpService.getChatMessages(this.id)
      .subscribe((resp: Response) => {
        const messageList = resp.json();
        for (const index in messageList){
          console.log(messageList[index]);
          const message = messageList[index];
          this.messages.push(message);
        }
      });*/
  }

  ngOnDestroy() {
    this.connection.unsubscribe();
    this.routeSubscription.unsubscribe();
  }
}
