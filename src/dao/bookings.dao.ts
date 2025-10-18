import db from '../config/db';

export class BookingDao{

    public getAllEvents = async () =>{
        const data = await db.query('SELECT * FROM events');
        return data.rows;
    }

}