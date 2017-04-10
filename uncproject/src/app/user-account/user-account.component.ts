import {Component, OnInit, Input} from '@angular/core';
import {User} from "../models/user.interface";
import {HttpService} from "../services/http.service";
import {Subscription} from "rxjs/Rx";
import {ActivatedRoute} from "@angular/router";
import {Response} from "@angular/http";
import {Gender} from "../models/gender.interface";
import {City} from "../models/city.interface";
import {State} from "../models/state.interface";
import {Country} from "../models/country.interface";

@Component({
    selector: 'app-user-account',
    templateUrl: './user-account.component.html',
    styleUrls: ['../profile-account/profile-account.component.css'],
    providers: [HttpService]
})
export class UserAccountComponent implements OnInit {
    public userAccount:User;
    private id:number;
    private routeSubscription:Subscription;

    constructor(private route:ActivatedRoute,private httpService:HttpService) {
        this.routeSubscription = route.params.subscribe(params=>this.id = params['id']);
    }

    ngOnDestroy() {
        this.routeSubscription.unsubscribe();
    }

    ngOnInit() {
        this.httpService.getUser(this.route.parent.snapshot.params["id"])
            .subscribe((resp:Response) => {
                let user = resp.json();
                if (user)
                    this.userAccount = user;
            });
    }
}
