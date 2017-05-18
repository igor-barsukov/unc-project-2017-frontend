import {Trip} from './trips.interface';
import {Transport} from './transport.interface';
/**
 * Created by Сергей on 11.05.2017.
 */
export class Movement{
    constructor(id: number, transport: Transport, travel: Trip, start_time: Date, end_time: Date, start_address: string, destination_address: string, price: number, distance: number, description: string, ticket: string, start_coordinates: number, destination_coordinates: number) {
        this.id = id;
        this.transport = transport;
        this.travel = travel;
        this.start_time = start_time;
        this.end_time = end_time;
        this.start_address = start_address;
        this.destination_address = destination_address;
        this.price = price;
        this.distance = distance;
        this.description = description;
        this.ticket = ticket;
        this.start_coordinates = start_coordinates;
        this.destination_coordinates = destination_coordinates;
    }

    id: number;
    transport: Transport;
    travel: Trip;
    start_time: Date;
    end_time: Date;
    start_address: string;
    destination_address: string;
    price: number;
    distance: number;
    description: string;
    ticket: string;
    start_coordinates: number;
    destination_coordinates: number;
}