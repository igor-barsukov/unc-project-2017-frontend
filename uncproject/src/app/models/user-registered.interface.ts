import {Gender} from "./gender.interface";
import {City} from "./city.interface";
export class UserRegistered {
  id:number;
  firstName:string;
  lastName:string;
  email:string;
  password:string;
  confirmPassword:string;
  gender:Gender;
  location:City;
  remember:boolean;
}
