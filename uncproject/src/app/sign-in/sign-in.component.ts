import {Component, OnInit} from '@angular/core';
import {UserSignIn} from "./user.sign-in.interface";
import {HttpService} from "../services/http.service";
import {Router} from "@angular/router";
import {UserRegistered} from "../models/user-registered.interface";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  providers: [HttpService]
})
export class SignInComponent implements OnInit {
  userSignIn:UserSignIn;
  receivedUser:UserRegistered;

  constructor(private route:Router, private httpService:HttpService) {
  }

  ngOnInit() {
    this.userSignIn = {
      email: '',
      password: ''
    }
  }

  done:boolean = false;

  signInUser(model:UserSignIn, isValid:boolean) {
    if (isValid) {
      this.httpService.signInUser(model)
        .subscribe((data) => {
          this.receivedUser = data;
          this.done = true;
          this.route.navigateByUrl("/profile/" + this.receivedUser.id + "/account");
        });
    }
  }

}
