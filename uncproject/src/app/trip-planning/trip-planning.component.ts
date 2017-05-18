import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from "rxjs/Subscription";
import {HttpService} from "../services/http.service";
import {ActivatedRoute} from "@angular/router";
import {TripService} from "../services/trip.service";
import {Trip} from "../models/trips.interface";
import {Day} from "../models/day.interface";
import {Activities} from "../models/activities.interface";
import {Movement} from "../models/movements.interface";

@Component({
    selector: 'app-trip-planning',
    templateUrl: './trip-planning.component.html',
    styleUrls: ['./trip-planning.component.css'],
    providers: [HttpService, TripService]
})
export class TripPlanningComponent implements OnInit, OnDestroy {
    showDialog = false;
    private id:number;
    private routeSubscription:Subscription;
    public days:Day[];
    public trip:Trip;
    private subOne:any;

    ngOnInit() {
        this.days = [new Day(1, new Date(), [])];
    }

    constructor(private route:ActivatedRoute, private httpService:HttpService, private tripService:TripService) {

        
        this.routeSubscription = route.params.subscribe(params=>this.id = params['id']);

        this.subOne = tripService.nameDay$.subscribe(
            nameDay => {
                this.days = nameDay;
            });
    }

    addDay() {
        this.days.push(new Day(this.days[this.days.length - 1].id + 1,
            new Date(this.days[this.days.length - 1].name.valueOf() + 24 * 60 * 60 * 1000), []));
        this.trip = this.tripService.getTrip();
        this.trip.endDate = this.days[this.days.length - 1].name;

        // this.httpService.updateTrip(this.trip)
        //     .subscribe((data) => {
        //         this.trip = data;
        //     });
    }

    ngOnDestroy() {
        this.routeSubscription.unsubscribe();
        this.subOne.unsubscribe();
    }
}
