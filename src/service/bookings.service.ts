import { BookingDto} from "../dto/bookings";
import { BookingDao } from "../dao/bookings.dao";

export class BookingService{

  constructor(private readonly bookingDao: BookingDao){}

  public getAllEvents = async (): Promise<BookingDto[]> =>{
        const eventsList = await this.bookingDao.getAllEvents();
        return eventsList;
  }

  public reserve = async (bookingDto: BookingDto) =>{
    try{
      await this.bookingDao.reserve(bookingDto);
    }catch(error){
      if (error instanceof Error && error.message === 'BOOKING_EXISTS') {
        throw new Error('Такой пользователь уже забронировал место на данное мероприятие');
      }
      if (error instanceof Error && error.message === 'EVENT_NOT_EXISTS') {
        throw new Error('Такого мероприятия не существует');
      }
    }
  }

}