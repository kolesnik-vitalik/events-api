import { BookingDto} from "../dto/bookings";
import { BookingDao } from "../dao/bookings.dao";
import { TopPlace } from "../dto/topPlace";

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

  public getTopUser = async (): Promise<TopPlace[]> => {
    const sortedUserList = await this.bookingDao.getTopUser();
    let place = 1;
    try{
      return sortedUserList.map((item, index, array) =>{
        if(index == 0 || item.booking_count === array[index - 1].booking_count){
          return {
            user_id: item.user_id,
            place: place,
            booking_count: item.booking_count
          };
        }else{
          place++;
          return {
            user_id: item.user_id,
            place: place,
            booking_count: item.booking_count
          }
        }
      })
    }catch(error){
      throw new Error('Ошибка загрузки данных');
    }
  } 

}