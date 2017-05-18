import {Component, OnInit, OnDestroy, OnChanges} from '@angular/core';
import {Location} from '@angular/common';
import {Subscription} from "rxjs/Subscription";
import {HttpService} from "../../services/http.service";
import {ActivatedRoute} from "@angular/router";
import {TripService} from "../../services/trip.service";
import {Day} from "../../models/day.interface";
import {Activities} from "../../models/activities.interface";
import {Movement} from "../../models/movements.interface";
import {NgForm} from '@angular/forms';
import {Trip} from "../../models/trips.interface";
import {Coordinates} from "../../models/coordinates.interface";
import {Transport} from "../../models/transport.interface";

@Component({
    selector: 'app-trip-day-field',
    templateUrl: './trip-day-field.component.html',
    styleUrls: ['./trip-day-field.component.css'],
    providers: [HttpService]
})
export class TripDayFieldComponent implements OnInit, OnDestroy {

    private subOne:any;
    private subTwo:any;
    private id:number;
    private tripPlanId:number = this.route.parent.snapshot.params["id"];
    tripDay:Day;
    condition:boolean = false;
    private routeSubscription:Subscription;
    activity:Activities[] = [];
    movement:Movement[] = [];
    i:number;
    
    constructor(private _location:Location, private route:ActivatedRoute, private httpService:HttpService, private tripService:TripService) {
        this.routeSubscription = route.params.subscribe(params=>this.id = params['id']);

        this.subOne = tripService.activity$.subscribe(
            activity => {

                this.tripService.setActivities(activity);
                
                if (new Date(activity.startTime).getDate() + new Date(activity.startTime).getMonth() ==
                    this.tripDay.name.getDate() + this.tripDay.name.getMonth()) {
                    this.tripDay.action.push(activity);

                    this.tripDay.action.sort(function (a, b) {
                        return (a.startTime.valueOf() + 24 * 60 * 60 * 1000) - (b.startTime.valueOf() + 24 * 60 * 60 * 1000);
                    });
                }

            });

        this.subTwo = tripService.movement$.subscribe(
            movement => {
                
                this.tripService.setMovement(movement);
                
                if (new Date(movement.startTime).getDate() + new Date(movement.startTime).getMonth() ==
                    this.tripDay.name.getDate() + this.tripDay.name.getMonth()) {
                    this.tripDay.action.push(movement);
                    //console.log(this.tripService.getTrip());
                }
                this.tripDay.action.sort(function (a, b) {
                    return (a.startTime.valueOf() + 24 * 60 * 60 * 1000) - (b.startTime.valueOf() + 24 * 60 * 60 * 1000);
                });
            });

    }

    ngOnInit() {

        this.tripDay = this.tripService.getDay(this.id - 1);
        console.log(this.tripDay);
        this.tripDay.action = [];
        this.activity = this.tripService.getActivities();
        this.movement = this.tripService.getMovements();

        for (var i = 0; i < this.activity.length; i++) {
            if (new Date(this.activity[i].startTime).getDate() + new Date(this.activity[i].startTime).getMonth() ==
                this.tripDay.name.getDate() + this.tripDay.name.getMonth()) {
                this.tripDay.action.push(this.activity[i]);
            }
        }
        for (var i = 0; i < this.movement.length; i++) {
            if (new Date(this.movement[i].startTime).getDate() + new Date(this.movement[i].startTime).getMonth() ==
                this.tripDay.name.getDate() + this.tripDay.name.getMonth()) {
                this.tripDay.action.push(this.movement[i]);
            }
        }

        this.tripDay.action.sort(function (a, b) {
            return (a.startTime.valueOf() + 24 * 60 * 60 * 1000) - (b.startTime.valueOf() + 24 * 60 * 60 * 1000);
        });
    }

    backClick() {
        this._location.go("/trip-planning/" + this.tripPlanId + "/day/" + this.id);
    }

    isMovement(variable) {
        //console.log(variable, variable instanceof Movement);
        return variable instanceof Movement;
    }

    isActivity(variable) {
        //console.log(variable, variable instanceof Activities);
        return variable instanceof Activities;
    }


    updateActivity(form:NgForm, id:number) {
        this.tripService.setActivities(new Activities(id, form.value.travel, form.value.name, form.value.address, form.value.description,
        form.value.price, form.value.ticket, new Coordinates('point', 0.0, 0.0), new Date(form.value.startTime), new Date(form.value.endTime)));
        // console.log(form.value);
    }
    
    updateMovement(form:NgForm, id:number, transportId: number){
        console.log(transportId);
        this.tripService.setMovement(new Movement(id, new Transport(transportId, ''), form.value.travel,new Date(form.value.startTime), new Date(form.value.endTime), form.value.startAddress, 
        form.value.destinationAddress, form.value.price, form.value.distance, form.value.description, form.value.ticket,  new Coordinates('point', 0.0, 0.0),  new Coordinates('point', 0.0, 0.0)))
    }

    ngOnDestroy() {
        this.routeSubscription.unsubscribe();
        this.subOne.unsubscribe();
        this.subTwo.unsubscribe();
    }
}
