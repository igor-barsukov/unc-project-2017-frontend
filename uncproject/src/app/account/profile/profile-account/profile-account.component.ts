import { Component, OnInit,OnDestroy } from '@angular/core';
import {Subscription} from "rxjs/Subscription";
import {Response} from "@angular/http";
import {ActivatedRoute} from "@angular/router";
import {User} from "../../../models/user.interface";
import {HttpService} from "../../../services/http.service";

@Component({
  selector: 'app-profile-account',
  templateUrl: './profile-account.component.html',
  styleUrls: ['./profile-account.component.css'],
  providers: [HttpService]
})
export class ProfileAccountComponent implements OnInit {
  public userProfile:User;
  
  constructor(private route:ActivatedRoute,private httpService:HttpService) {
  }
  
  ngOnInit() {
    this.httpService.getUser(this.route.parent.parent.snapshot.params["id"])
      .subscribe((resp:Response) => {
        let user = resp.json();
        if (user)
          this.userProfile = user;
        
      });
    
  }

}
