import {Component, OnInit} from '@angular/core';
import {HttpService} from "../services/http.service";
import {UserRegistered} from "../models/user-registered.interface";
import 'rxjs/add/operator/toPromise'
import {Router} from "@angular/router";
import {Gender} from "../models/gender.interface";
import {City} from "../models/city.interface";
import {Country} from "../models/country.interface";
import {Response} from "@angular/http";
import { LocalStorageService } from 'angular-2-local-storage';

export class Form{
  id: number;
  firstName:string;
  lastName:string;
  email:string;
  password:string;
  confirmPassword:string;
  gender:string
  city:string;
  remember:boolean;
}

@Component({
  selector: 'app-registered',
  templateUrl: './registered.component.html',
  styleUrls: ['./registered.component.css'],
  providers: [HttpService]
})
export class RegisteredComponent implements OnInit {

  userRegistered:UserRegistered;
  receivedUser:UserRegistered; // полученный пользователь
  listCities: Country[]=[];
  form:Form;
  
  constructor(private route:Router, private httpService:HttpService,private localStorageService: LocalStorageService) {
  }
  
  ngOnInit() {
    this.form = {
      id: null,
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      gender: '',
      city: '',
      remember: false
    }

    console.log(localStorage.getItem('id'));
    
    this.httpService.getCity()
      .subscribe((resp: Response) => {
        let cityList = resp.json();
        for(let index in cityList){
          //console.log(resp);
          let city = cityList[index];
          this.listCities.push(city);
        }
        //console.log(this.listCities);
      });
  }
  
  done:boolean = false;
  freeEmail:boolean = true;
  checkEmail(isValid:boolean) {
    if (isValid) {
      this.httpService.checkEmail(this.form.email)
        .subscribe((data) => {
            this.freeEmail = false;
          },
          error => this.freeEmail = true
        )
    }
  }


  addOrUpdateUser(model:Form, isValid:boolean) {
    if (isValid) {
      this.userRegistered = new UserRegistered(null, model.firstName, model.lastName, model.email, model.password, new Gender(model.gender,""), new City("1",""));

      this.httpService.addOrUpdateUser(this.userRegistered)
        .subscribe((data) => {
         this.receivedUser = data;
          this.done = true;
          this.route.navigateByUrl("/account/" + this.receivedUser.id + "/profile/account");
          localStorage.setItem('id', this.receivedUser.id.toString());
        });
      console.log(this.userRegistered);
    }
  }
}
