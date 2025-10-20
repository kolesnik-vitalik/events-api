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

  public getTopUser = async () => {
    let place = 1;
    try{
      const booking_count = await this.bookingDao.getTopUser();
      const top_user = [...booking_count.data];
      const event_created_at = [...booking_count.created_at];

      const sorted_top_user = top_user.sort((a,b)=> a.booking_count - b.booking_count);
      const new_list =  sorted_top_user.reverse().map((item,index,array) =>{
        if(index == 0){
          item.place = place;
          return item;
        }
        if(item.booking_count > array[index - 1].booking_count){
          item.place = array[index - 1].place;
          array[index - 1].place += 1;
          return item;
        }
        if(array[index - 1].booking_count == item.booking_count){
          let created_at_item = 0;
          let prev_created_at = 0;
          event_created_at.forEach((elem) =>{
            if(elem.user_id == item.user_id){
              created_at_item = elem.created_at;
            }
            if(elem.user_id == array[index - 1].user_id){
              prev_created_at = elem.created_at;
            }
          })
          if(created_at_item - prev_created_at > 0){
            item.place = place;
          }

          if(created_at_item - prev_created_at < 0){
            item.place = place;
            let temp = item;
            item = array[index - 1];
            array[index - 1] = temp;
            return array[index - 1]
          }
          
        }else{
          place++;
          item.place = place;
        }
        return item;
      });
      return new_list;
    }catch(error){
      throw new Error('Ошибка загрузки данных');
    }
  } 

}