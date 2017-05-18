import {Injectable} from '@angular/core';
import {Trip} from '../models/trips.interface';
import {Subject} from 'rxjs/Subject';
import {Day} from '../models/day.interface';
import {Activities} from '../models/activities.interface';
import {Movement} from '../models/movements.interface';


@Injectable()
export class TripService {

  private trip: Trip;

  private nameDaySource = new Subject<Day[]>();
  nameDay$ = this.nameDaySource.asObservable();

  setNameDay(nameDay: Day[]) {
    // console.log(nameDay);
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

  getDays(){
    return this.trip.days;
  }

  addDay(addDay: Day) {
    // this.trip.days.push(addDay);
    console.log(this.trip);
  }

  getDay(id: number) {
    return this.trip.days[id];
  }

  setActivities(activity: Activities){
    this.trip.activities.push(activity);
  }
  getActivities(){
    return this.trip.activities;
  }

  setMovement(movement: Movement){
    this.trip.movements.push(movement);
  }
  getMovements(){
    return this.trip.movements;
  }

}
