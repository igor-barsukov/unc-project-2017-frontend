import {Injectable} from '@angular/core';
import {Trip} from '../models/trips.interface';
import {Subject} from 'rxjs/Subject';
import {Day} from '../models/day.interface';
import {Activities} from '../models/activities.interface';
import {Movement} from '../models/movements.interface';
import {HttpService} from './http.service';
/**
 * Created by Сергей on 30.04.2017.
 */
@Injectable()
export class TripService {

  private trip: Trip;

  constructor(private httpService: HttpService) {
  }

  private nameDaySource = new Subject<Day[]>();
  nameDay$ = this.nameDaySource.asObservable();

  setNameDay(nameDay: Day[]) {
    this.nameDaySource.next(nameDay);
  }

  private activitiesSubject = new Subject<Activities>();
  activity$ = this.activitiesSubject.asObservable();

  setActivitySubject(activity: Activities) {
    this.activitiesSubject.next(activity);
  }

  private movementsSubject = new Subject<Movement>();
  movement$ = this.movementsSubject.asObservable();

  setMovementSubject(movement: Movement) {
    this.movementsSubject.next(movement);
  }

  addTrip(addTrip: Trip) {
    this.trip = addTrip;
    // console.log(this.trip);
  }

  getTrip(): Trip {
    return this.trip;
  }

  getDays() {
    return this.trip.days;
  }

  addDay(addDay: Day) {
    //this.trip.days.push(addDay);
    console.log(this.trip);
  }

  getDay(id: number) {
    return this.trip.days[id];
  }

  setActivities(activity: Activities) {
    console.log(activity);
    this.httpService.addActivity(activity, this.trip.id)
      .subscribe((data) => {
        console.log(data);
      });
    this.trip.activities.push(activity);
  }

  getActivities() {
    return this.trip.activities;
  }

  setMovement(movement: Movement) {

    console.log(movement);
    // this.httpService.addMovement(movement, this.trip.id)
    //     .subscribe((data) => {
    //         console.log(data);
    //     });
    this.trip.movements.push(movement);
    //console.log(this.trip);
  }

  getMovements() {
    return this.trip.movements;
  }

}
