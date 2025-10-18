import { Request, Response } from 'express';
import { BookingService } from '../service/bookings.service';

export class BookingController{

    constructor(private readonly booking: BookingService){
        this.booking = booking;
    }

    public getAll = async (req: Request, res: Response) =>{
        const data = await this.booking.getAll();
        res.json(data);
    }

}