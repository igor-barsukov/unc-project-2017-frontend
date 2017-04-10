import {Gender} from "./gender.interface";
import {City} from "./city.interface";
import {State} from "./state.interface";
import {Country} from "./country.interface";

export class User{
    lastName:string;
    firstName:string;
    birthday:string;
    gender: Gender;
    info:string;
    country:Country;
    city:City;
    state:State;
}
