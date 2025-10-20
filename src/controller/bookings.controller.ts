import { Request, Response } from 'express';
import { BookingDto } from '../dto/bookings';
import { BookingService } from '../service/bookings.service';

export class BookingController{

    constructor(private readonly bookingService: BookingService){
        this.bookingService = bookingService;
    }

    public getAllEvents = async (req: Request, res: Response): Promise<void> =>{
        const eventsList = await this.bookingService.getAllEvents();
        res.json(eventsList);
    }

    public reserve = async (req: Request<{}, {}, BookingDto>, res: Response) =>{
        if(!req.body.event_id || !req.body.user_id){
            return res.status(400).json({error: "Поля event_id и user_id не должны быть пустыми"}) 
        }

        if (
            typeof req.body.event_id !== 'number' ||
            !Number.isInteger(req.body.event_id) ||
            req.body.event_id <= 0
          ) {
            throw new Error('event_id должен быть положительным целым числом');
          }

        if (typeof req.body.user_id !== 'string' || req.body.user_id.trim() === '') {
            throw new Error('user_id должен быть непустой строкой');
        }

        try{
            await this.bookingService.reserve(req.body);
            res.status(201).json({message: "Место забронировано"});
        }catch(error){
            if (error instanceof Error) {
                return res.status(409).json({ error: error.message });
              }
        }
    }

    public getTopUser = async (req: Request, res: Response)=>{
        try{
           const resulte = await this.bookingService.getTopUser();
           res.status(200).json(resulte);
        }catch(error){
            if(error instanceof Error){
                return res.status(500).json({error: error.message});
            }
        }
    }

}