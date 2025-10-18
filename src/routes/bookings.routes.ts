import { Router } from 'express';
import { BookingController } from '../controller/bookings.controller';
import { BookingService } from '../service/bookings.service';

const service = new BookingService()
let controller = new BookingController(service);
console.log(controller);

const router = Router();

router.get('/', controller.getAllEvents);

export default router;