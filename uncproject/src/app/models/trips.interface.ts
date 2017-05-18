import {Day} from './day.interface';
import {Activities} from './activities.interface';
import {Movement} from './movements.interface';
export class Trip{
     id: number;
     img: string;
     name: string;
     startDate: Date;
     endDate: Date;
     info: string;
     active: boolean;
     days: Day[] = [];
     activities: Activities[] = [];
     movements: Movement[] = [];
}
