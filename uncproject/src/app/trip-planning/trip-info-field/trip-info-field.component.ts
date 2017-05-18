import {Component, OnInit,} from '@angular/core';
import {HttpService} from "../../services/http.service";
import {Trip} from "../../models/trips.interface";
import {TripService} from "../../services/trip.service";
import {Day} from "../../models/day.interface";
import {ActivatedRoute} from "@angular/router";
import {Activities} from "../../models/activities.interface";
import {Movement} from "../../models/movements.interface";
import { LocalStorageService } from 'angular-2-local-storage';
@Component({
    selector: 'app-trip-info-field',
    templateUrl: './trip-info-field.component.html',
    styleUrls: ['./trip-info-field.component.css'],
    providers: [HttpService]
})
export class TripInfoFieldComponent implements OnInit {
    trip:Trip;
    days:Day[] = [];
    tripPlanId:number = this.route.parent.snapshot.params["id"];

    constructor(private route:ActivatedRoute, private httpService:HttpService, private tripService:TripService,private localStorageService: LocalStorageService) {
    }

    ngOnInit() {
        if (this.tripPlanId == 0) {
            this.trip = {
                id: null,
                img: '',
                name: '',
                startDate: null,
                endDate: null,
                info: '',
                active: false,
                days: [null],
                activities: [null],
                movements: [null]
            };
        } else {
            this.httpService.getTrip(this.tripPlanId)
                .subscribe((data) => {
                    this.trip = data;

                    var i = 1;
                    this.days.push(new Day(i, new Date(this.trip.startDate), []));
                    while (this.days[this.days.length - 1].name < new Date(this.trip.endDate)) {
                        i++;
                        this.days.push(new Day(i, new Date(this.days[this.days.length - 1].name.valueOf() + 24 * 60 * 60 * 1000), []));
                    }
                    this.trip.days = this.days;
                    this.trip.activities = [];
                    this.trip.movements = [];
                    this.httpService.getActivitiesToTrip(this.tripPlanId)
                        .subscribe((data) => {
                            for (let index in data) {
                                let activity = data[index];
                                this.trip.activities.push(new Activities(activity.id, activity.travel, activity.name, activity.address,
                                    activity.description, activity.price, activity.ticket, activity.coordinates, new Date(activity.startTime),
                                    new Date(activity.endTime)));
                            }
                        });

                    this.httpService.getMovementToTrip(this.tripPlanId)
                        .subscribe((data) => {
                            for (let index in data) {
                                let movement = data[index];
                                //console.log(movement);
                                this.trip.movements.push(new Movement(movement.id, movement.transport, movement.travel, new Date(movement.startTime),
                                    new Date(movement.endTime), movement.startAddress, movement.destinationAddress, movement.price, movement.distance,
                                    movement.description, movement.ticket, movement.start_coordinates, movement.destination_coordinates));
                            }
                        });
                    this.tripService.addTrip(this.trip);
                    this.tripService.setNameDay(this.days);
                    //console.log(this.trip);
                });
        }
    }

    addOrUpdateTrip(model:Trip, isValid:boolean) {
        if (isValid) {
            this.days = [];
            if (this.tripPlanId == 0) {
                this.trip.active = true;

                if (model.endDate != null) {
                    var i = 1;
                    this.days.push(new Day(i, new Date(this.trip.startDate), []));

                    while (this.days[this.days.length - 1].name < new Date(model.endDate)) {
                        i++;
                        this.days.push(new Day(i, new Date(this.days[this.days.length - 1].name.valueOf() + 24 * 60 * 60 * 1000), []));
                    }
                    this.trip.days = this.days;
                    this.trip.activities = [];
                    this.trip.movements = [];
                    this.tripService.addTrip(this.trip);
                    this.tripService.setNameDay(this.days);


                    this.httpService.addOrUpdateTrip(this.trip, 1)
                        .subscribe((data) => {
                            this.trip = data;
                        });

                } else {
                    this.trip.days[0] = new Day(1, new Date(this.trip.startDate), []);
                    this.days.push(new Day(1, new Date(this.trip.startDate), []));
                    this.trip.days = this.days;
                    this.trip.activities = [];
                    this.trip.movements = [];
                    this.tripService.addTrip(this.trip);
                    this.tripService.setNameDay(this.days);

                    this.httpService.addOrUpdateTrip(this.trip, 1)
                        .subscribe((data) => {
                            this.trip = data;
                        });
                }
            } else {
                this.httpService.addOrUpdateTrip(this.trip, parseInt(localStorage.getItem('id')))
                    .subscribe((data) => {
                        this.trip = data;
                    });

                var i = 1;
                this.days.push(new Day(i, new Date(this.trip.startDate), []));
                while (this.days[this.days.length - 1].name < new Date(this.trip.endDate)) {
                    i++;
                    this.days.push(new Day(i, new Date(this.days[this.days.length - 1].name.valueOf() + 24 * 60 * 60 * 1000), []));
                }
                this.trip.days = this.days;
                this.tripService.setNameDay(this.days);
                //console.log(this.tripService.getTrip());
            }
        }
    }
}
