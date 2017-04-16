import { Component, OnInit, OnDestroy} from '@angular/core';
import { Location } from '@angular/common';
import {Subscription} from "rxjs/Subscription";
import {HttpService} from "../../services/http.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-trip-day-field',
  templateUrl: './trip-day-field.component.html',
  styleUrls: ['./trip-day-field.component.css'],
  providers: [HttpService]
})
export class TripDayFieldComponent implements OnInit, OnDestroy {


  private tripPlanId:number = this.route.parent.snapshot.params["id"];
  private id:number;
  private routeSubscription:Subscription;

  constructor(private _location: Location,private route:ActivatedRoute, private httpService:HttpService) {
    this.routeSubscription = route.params.subscribe(params=>this.id = params['id']);
  }
  backClick(){
    this._location.go("/trip-planning/" + this.tripPlanId +"/day/" +this.id);
  }
  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }

  ngOnInit() {
  }

}
