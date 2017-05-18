import {Trip} from './trips.interface';
/**
 * Created by Сергей on 04.05.2017.
 */
export class Activities{

    id: number;
    travel: Trip;
    name: string;
    address: string;
    description: string;
    price: number;
    ticket: string;
    coordinates: number;
    start_time: Date;
    end_time: Date;

    constructor(id: number, travel: Trip, name: string, address: string, description: string, price: number, ticket: string, coordinates: number, start_time: Date, end_time: Date) {
        this.id = id;
        this.travel = travel;
        this.name = name;
        this.address = address;
        this.description = description;
        this.price = price;
        this.ticket = ticket;
        this.coordinates = coordinates;
        this.start_time = start_time;
        this.end_time = end_time;
    }

}