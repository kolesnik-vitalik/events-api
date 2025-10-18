import { Request, Response } from 'express';
import { BookingService } from '../service/bookings.service';
import db from '../config/db';

export class BookingController{

    booking: BookingService;

    constructor(booking: BookingService){
        this.booking = booking;
    }

     async getAllEvents(req: Request, res: Response){
        let data = await this.booking.getAll();
        res.json(data);
    }

}