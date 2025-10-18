import { Router } from 'express';
import { BookingController } from '../controller/bookings.controller';
import { BookingDao } from '../dao/bookings.dao';
import { BookingService } from '../service/bookings.service';

const bookingDao: BookingDao = new BookingDao();
const bookingService: BookingService = new BookingService(bookingDao);
const bookingController: BookingController = new BookingController(bookingService);

const router = Router();

router.get('/events', bookingController.getAllEvents);
router.post('/events', bookingController.reserve);

export default router;