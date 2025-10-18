import { BookingDto} from "../dto/bookings";
import db from '../config/db';

export class BookingService{

     async getAll(){
        console.log('DB object:', db); 
        try {
            let result = await db.query('SELECT * FROM events');
            return result.rows;
          } catch (error) {
            console.error('Database error in getAllEvents:', error);
            throw new Error('Failed to fetch events');
          }
    }

     createBooking(bookingDto: BookingDto){
        
    }

}