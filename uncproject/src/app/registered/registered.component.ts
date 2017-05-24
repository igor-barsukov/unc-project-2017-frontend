import {Component, OnInit} from '@angular/core';
import {HttpService} from '../services/http.service';
import {UserRegistered} from '../models/user-registered.interface';
import 'rxjs/add/operator/toPromise';
import {Router} from '@angular/router';
import {Gender} from '../models/gender.interface';
import {City} from '../models/city.interface';
import {Country} from '../models/country.interface';
import {Response} from '@angular/http';
import { LocalStorageService } from 'angular-2-local-storage';
import {State} from '../models/state.interface';
import { FacebookService, LoginResponse, LoginOptions, UIResponse, UIParams } from 'ngx-facebook';
import { AuthService } from 'angular2-social-login';

export class Form{
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  country: string;
  state: string;
  city: string;
}

@Component({
  selector: 'app-registered',
  templateUrl: './registered.component.html',
  styleUrls: ['./registered.component.css'],
  providers: [HttpService]
})
export class RegisteredComponent implements OnInit {

  userRegistered: UserRegistered;
  receivedUser: UserRegistered; // полученный пользователь
  listCities: Country[]= [];
  listStateOfTheCountry: State[]= [];
  listCityesOfTheState: City[]= [];
  form: Form = new Form();
  remember = false;
  public u;
  sub: any;

  constructor(public _auth: AuthService, private fb: FacebookService, private route: Router, private httpService: HttpService, private localStorageService: LocalStorageService) {
    console.log('Initializing Facebook');

    fb.init({
      appId      : '1455074181180837',
      cookie     : true,
      xfbml      : true,
      version    : 'v2.9'
    });
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
      country: '',
      state: '',
      city: ''
    };

    console.log(localStorage.getItem('id'));

    this.httpService.getCountries()
      .subscribe((resp: Response) => {
        const cityList = resp.json();
        for (const index in cityList){
          const city = cityList[index];
          this.listCities.push(city);
        }
        //console.log(this.listCities);
      });
  }

  done = false;
  freeEmail = true;

  setCountryId(idCountry: string){
    this.httpService.getStatesOfTheCountry(idCountry)
      .subscribe((resp: Response) => {
        const stateList = resp.json();
        for (const index in stateList){
          const state = stateList[index];
          this.listStateOfTheCountry.push(state);
        }
        //console.log(this.listCities);
      });
  }

  setStateId(idState: string){
    this.httpService.getCitiesOfTheState(idState)
      .subscribe((resp: Response) => {
        const citiesList = resp.json();
        for (const index in citiesList){
          const city = citiesList[index];
          this.listCityesOfTheState.push(city);
        }
       // console.log(this.listCities);
      });
  }

  checkEmail(isValid: boolean) {
    if (isValid) {
      this.httpService.checkEmail(this.form.email)
        .subscribe((data) => {
            this.freeEmail = false;
          },
          error => this.freeEmail = true
        );
    }
  }


  addOrUpdateUser(model: Form, isValid: boolean) {
    if (isValid) {
      this.userRegistered = new UserRegistered(null, model.firstName, model.lastName, model.email, model.password, new Gender(model.gender, ''), new City(model.city, ''));

      this.httpService.addUser(this.userRegistered)
        .subscribe((data) => {
         this.receivedUser = data;
          this.done = true;
          console.log( this.receivedUser);
          this.route.navigateByUrl('/account/' + this.receivedUser.id + '/profile/account');
          if (this.remember) {
            localStorage.setItem('id', this.receivedUser.id.toString());
          }else{
            localStorage.setItem('id', null);
          }
        });

      console.log( this.userRegistered);
    }
  }

  signIn(provider){
    this.sub = this._auth.login(provider).subscribe(
      (data) => {
        console.log('data', data);
        this.u = data;

        this.userRegistered = new UserRegistered(null, '', '', '', '', null, null);
        this.userRegistered.firstName = this.u.name;
        this.userRegistered.email = this.u.email;
        this.userRegistered.id = this.u.uid;
        this.userRegistered.lastName = 'Popov';
        this.userRegistered.city = new City(37356, 'Voronezh');
        this.userRegistered.password = 'qwerty';
        this.userRegistered.gender = new Gender(1, 'male');
        this.httpService.addUser(this.userRegistered);
            // this.receivedUser.firstName = this.u.name;
            // this.receivedUser.email = this.u.email;
            // this.receivedUser.id = this.u.uid;
            //  console.log( this.receivedUser);
            this.route.navigateByUrl('/account/' + this.userRegistered.id + '/profile/account');
            if (this.remember) {
              localStorage.setItem('id', this.userRegistered.id.toString());
            }else{
              localStorage.setItem('id', null);
            }
        console.log( 'reg user', this.userRegistered);
      }
    );
    console.log('fb_user', this.u.name);
  };

  // login() {
  //   const loginOpt: LoginOptions = {
  //     enable_profile_selector:true,
  //     return_scopes: true,
  //     scope: 'email'
  //   }
  //   this.fb.login(loginOpt)
  //     .then((res: LoginResponse) => {
  //         console.log('logged in', res);
  //     })
  //
  //   this.userRegistered = new UserRegistered(null, '', '', '', '', null, null);
  //
  //   this.httpService.addUser(this.userRegistered)
  //     .subscribe((data) => {
  //       this.receivedUser = data;
  //       this.done = true;
  //       console.log( this.receivedUser);
  //       this.route.navigateByUrl("/account/" + this.receivedUser.id + "/profile/account");
  //       if(this.remember) {
  //         localStorage.setItem('id', this.receivedUser.id.toString());
  //       }else{
  //         localStorage.setItem('id', null);
  //       }
  //     });
  //
  //   console.log( this.userRegistered);
  // }
}
