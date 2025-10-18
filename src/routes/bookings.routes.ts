import { Router } from 'express';
import { BookingController } from '../controller/bookings.controller';
import { BookingService } from '../service/bookings.service';

const bookingService = new BookingService()
const bookingController = new BookingController(bookingService);

const router = Router();

router.get('/events', bookingController.getAll);

export default router;