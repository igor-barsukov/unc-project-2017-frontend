import { Component, OnInit} from '@angular/core';
import { Location } from '@angular/common';


@Component({
  selector: 'app-trip-day-field',
  templateUrl: './trip-day-field.component.html',
  styleUrls: ['./trip-day-field.component.css']
})
export class TripDayFieldComponent implements OnInit {

  constructor(private  _location: Location) { }
  backClick(){
    this._location.back();
  }


  ngOnInit() {
  }

}
