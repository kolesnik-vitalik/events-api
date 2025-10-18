import db from '../config/db';

export class BookingDao{

    public async getAllEvents(){
        const data = await db.query('SELECT * FROM events');
        return data.rows;
    } 

}