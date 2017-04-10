import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Response, Headers, URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {UserRegistered} from "../models/user-registered.interface";
import {UserSignIn} from "../sign-in/user.sign-in.interface";

declare var jQuery:any;

@Injectable()
export class HttpService {

  constructor(private http:Http) {
  }

  addOrUpdateUser(obj:UserRegistered) {
    var csrf_token = jQuery("meta[name='_csrf']").attr("content");
    var csrf_token_name = jQuery("meta[name='_csrf_header']").attr("content");
    let headers = new Headers({
      'Content-Type': 'application/json;charset=utf-8'
    });
    if (csrf_token_name && csrf_token)
      headers.set(csrf_token_name, csrf_token);

    return this.http.post('http://localhost:8181/users', obj, {headers: headers})
      .map((resp:Response)=>resp.json())
      .catch((error:any) => {
        return Observable.throw(error);
      });
  }


  signInUser(obj:UserSignIn) {

    var csrf_token = jQuery("meta[name='_csrf']").attr("content");
    var csrf_token_name = jQuery("meta[name='_csrf_header']").attr("content");
    let headers = new Headers({
      'Content-Type': 'application/json;charset=utf-8'
    });
    if (csrf_token_name && csrf_token)
      headers.set(csrf_token_name, csrf_token);

    var params = obj.password+"/"+obj.email;

    console.log(params.toString());
    return this.http.post('http://localhost:8181/users/login/' + params, {headers: headers})
      .map((resp:Response)=>resp.json())
      .catch((error:any) => {
        return Observable.throw(error);
      });
  }


  getTravelsToUser(id) {
    return this.http.get('http://localhost:8181/userToTravels/travelsByUserId/' + id)
      .catch((error:any) => {
        return Observable.throw(error);
      });
  }

  getAlbums() {
    return this.http.get('assets/user.album.json')
  }

  getData() {
    return this.http.get('assets/trips.json')
  }

  getProfileTrips() {
    return this.http.get('http://localhost:8181/travels')
      .catch((error:any) => {
        return Observable.throw(error);
      });
  }

  checkEmail(email) {
    return this.http.get('http://localhost:8181/users/getByEmail/' + email)
  }


  getUser(id) {
    return this.http.get('http://localhost:8181/users/' + id)
      .catch((error:any) => {
        return Observable.throw(error);
      });
  }
}
