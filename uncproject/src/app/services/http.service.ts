import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Response, Headers, URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {UserRegistered} from '../models/user-registered.interface';
import {UserSignIn} from '../sign-in/user.sign-in.interface';
import {User} from '../models/user.interface';
import {Trip} from '../models/trips.interface';
import {chatMessage} from '../models/chatMessage.inerface';

declare var jQuery: any;

@Injectable()
export class HttpService {

    constructor(private http: Http) {
    }

    addUser(obj: UserRegistered) {
        const csrf_token = jQuery('meta[name=\'_csrf\']').attr('content');
        const csrf_token_name = jQuery('meta[name=\'_csrf_header\']').attr('content');
        const headers = new Headers({
            'Content-Type': 'application/json;charset=utf-8'
        });
        if (csrf_token_name && csrf_token)
            headers.set(csrf_token_name, csrf_token);
        return this.http.post('http://localhost:8181/users', obj, {headers: headers})
            .map((resp: Response) => resp.json())
            .catch((error: any) => {
                return Observable.throw(error);
            });
    }

    updateUser(obj: User) {
        const csrf_token = jQuery('meta[name=\'_csrf\']').attr('content');
        const csrf_token_name = jQuery('meta[name=\'_csrf_header\']').attr('content');
        const headers = new Headers({
            'Content-Type': 'application/json;charset=utf-8'
        });
        if (csrf_token_name && csrf_token)
            headers.set(csrf_token_name, csrf_token);
        return this.http.post('http://localhost:8181/users', obj, {headers: headers})
            .map((resp: Response) => resp.json())
            .catch((error: any) => {
                return Observable.throw(error);
            });
    }

    signInUser(obj: UserSignIn) {
        const csrf_token = jQuery('meta[name=\'_csrf\']').attr('content');
        const csrf_token_name = jQuery('meta[name=\'_csrf_header\']').attr('content');
        const headers = new Headers({
            'Content-Type': 'application/json;charset=utf-8'
        });
        if (csrf_token_name && csrf_token)
            headers.set(csrf_token_name, csrf_token);

        return this.http.post('http://localhost:8181/users/login/', obj, {headers: headers})
            .map((resp: Response) => resp.json())
            .catch((error: any) => {
                return Observable.throw(error);
            });
    }


    getTravelsToUser(id) {
        return this.http.get('http://localhost:8181/userToTravels/travelsByUserId/' + id)
            .catch((error: any) => {
                return Observable.throw(error);
            });
    }

    getCountries() {
        return this.http.get('http://localhost:8181/countries')
            .catch((error: any) => {
                return Observable.throw(error);
            });
    }

    getStatesOfTheCountry(id) {
        return this.http.get('http://localhost:8181/states/country/' + id)
            .catch((error: any) => {
                return Observable.throw(error);
            });
    }

    getCitiesOfTheState(id) {
        return this.http.get('http://localhost:8181/cities/state/' + id)
            .catch((error: any) => {
                return Observable.throw(error);
            });
    }

    getAlbums() {
        return this.http.get('http://localhost:8181/#/account/albums/4');
    }

    getHomeTrips() {
        return this.http.get('http://localhost:8181/travels')
            .catch((error: any) => {
                return Observable.throw(error);
            });
    }

    getProfileTrips() {
        return this.http.get('http://localhost:8181/travels')
            .catch((error: any) => {
                return Observable.throw(error);
            });
    }

    checkEmail(email) {
        return this.http.get('http://localhost:8181/users/getByEmail/' + email);
    }


    getUser(id) {
        return this.http.get('http://localhost:8181/users/' + id)
            .catch((error: any) => {
                return Observable.throw(error);
            });
    }

    getAllUsers() {
      return this.http.get('http://localhost:8181/users/')
        .catch((error: any) => {
          return Observable.throw(error);
        });
    }

    addOrUpdateTrip(obj: Trip) {
        const csrf_token = jQuery('meta[name=\'_csrf\']').attr('content');
        const csrf_token_name = jQuery('meta[name=\'_csrf_header\']').attr('content');
        const headers = new Headers({
            'Content-Type': 'application/json;charset=utf-8'
        });
        if (csrf_token_name && csrf_token)
            headers.set(csrf_token_name, csrf_token);
        return this.http.post('http://localhost:8181/travels', obj, {headers: headers})
            .map((resp: Response) => resp.json())
            .catch((error: any) => {
                return Observable.throw(error);
            });
    }

    getTrip(id: number){
        return this.http.get('http://localhost:8181/travels/' + id)
            .map((resp: Response) => resp.json())
            .catch((error: any) => {
                return Observable.throw(error);
            });
    }

  gerActivitiesToTrip(idTrip: number){
    return this.http.get('http://localhost:8181/activities/travel/' + idTrip)
      .map((resp: Response) => resp.json())
      .catch((error: any) => {
        return Observable.throw(error);
      });
  }
  gerMovementToTrip(idTrip: number){
    return this.http.get('http://localhost:8181/movements/travel/' + idTrip)
      .map((resp: Response) => resp.json())
      .catch((error: any) => {
        return Observable.throw(error);
      });
  }

  sendChatMessage(obj: chatMessage) {
    const csrf_token = jQuery('meta[name=\'_csrf\']').attr('content');
    const csrf_token_name = jQuery('meta[name=\'_csrf_header\']').attr('content');
    const headers = new Headers({
      'Content-Type': 'application/json;charset=utf-8'
    });
    if (csrf_token_name && csrf_token)
      headers.set(csrf_token_name, csrf_token);

    return this.http.post('http://localhost:8181/chatTravels', obj, {headers: headers})
      .map((resp: Response) => resp.json())
      .catch((error: any) => {
        return Observable.throw(error);
      });
  }

  getChatMessages(id: number){
    return this.http.get('http://localhost:8181/chatTravels/travel=' + id)
      .map((resp: Response) => resp.json())
      .catch((error: any) => {
        return Observable.throw(error);
      });
  }
}
