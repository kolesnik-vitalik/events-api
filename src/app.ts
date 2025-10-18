import 'dotenv/config';
import express from 'express';
import bookingRoutes from './routes/bookings.routes';

const app = express();
app.use(express.json());

app.use('/api/bookings', bookingRoutes);

app.listen(8080, () => {
  console.log('Server running on http://localhost:8080');
});