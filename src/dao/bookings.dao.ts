import db from '../config/db';
import { BookingDto } from '../dto/bookings';

export class BookingDao{

    public getAllEvents = async (): Promise<BookingDto[]> =>{
        try{
            const eventsList = await db.query('SELECT * FROM events');
            return eventsList.rows;
        }catch(error){
            console.error('Database error in getAllEvents:', error);
            throw new Error('Failed to fetch events');
        }
    }

    public reserve = async (bookingDto: BookingDto) =>{

        const existsById = await this.existsById(bookingDto.event_id);

        if(!existsById){
            throw new Error("EVENT_NOT_EXISTS");
        }

        const existing = await db.query(
            'SELECT 1 FROM bookings WHERE event_id = $1 AND user_id = $2',
            [bookingDto.event_id, bookingDto.user_id]
          );

        if(existing.rows.length > 0){
            throw new Error("BOOKING_EXISTS");
        }

        await db.query(
            'INSERT INTO bookings (event_id, user_id, created_at) VALUES ($1, $2, NOW())',
            [bookingDto.event_id, bookingDto.user_id]
        );
    }

    private existsById = async (id: number): Promise<boolean> =>{
        const result = await db.query(
            'SELECT 1 FROM events WHERE id = $1',
            [id]
          );
          return result.rows.length > 0;
    }

    public getTopUser = async () => {
            const created_at = await db.query("select * from bookings where event_id = 1");
            const data = await db.query("select user_id, COUNT(*) as booking_count from bookings group by user_id");
            const resulte_with_date = {
                created_at: [...created_at.rows],
                data: [...data.rows]
            }
            return resulte_with_date;
    }

}