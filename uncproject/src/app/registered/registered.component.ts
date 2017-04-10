import {Component, OnInit} from '@angular/core';
import {HttpService} from "../services/http.service";
import {UserRegistered} from "../models/user-registered.interface";
import 'rxjs/add/operator/toPromise'
import {Router} from "@angular/router";
import {Gender} from "../models/gender.interface";
import {City} from "../models/city.interface";

@Component({
  selector: 'app-registered',
  templateUrl: './registered.component.html',
  styleUrls: ['./registered.component.css'],
  providers: [HttpService]
})
export class RegisteredComponent implements OnInit {

  userRegistered:UserRegistered;
  receivedUser:UserRegistered; // полученный пользователь
  gender: Gender;
  city:City;
  ngOnInit() {
    this.userRegistered = {
      id: null,
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      gender: this.gender,
      location: this.city,
      remember: false
    }
  }

  constructor(private route:Router, private httpService:HttpService) {
  }

  done:boolean = false;
  freeEmail:boolean = true;
  checkEmail(isValid:boolean) {
    if (isValid) {
      this.httpService.checkEmail(this.userRegistered.email)
        .subscribe((data) => {
            this.freeEmail = false;
          },
          error => this.freeEmail = true
        )
    }
  }

  getGender(){

  }

  addOrUpdateUser(model:UserRegistered, isValid:boolean) {
    if (isValid) {
      this.httpService.addOrUpdateUser(model)
        .subscribe((data) => {
          this.receivedUser = data;
          this.done = true;
          this.route.navigateByUrl("/profile/" + this.receivedUser.id + "/account");
        });
    }
  }
}
