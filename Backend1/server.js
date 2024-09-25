import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js'; 
import authRoutes from './Routes/authroute.js'

dotenv.config();

// Connect to the database
connectDB();

const app = express();

app.use(express.json());
app.use(morgan('dev'));
//routes
app.use('/api/vi/auth',authRoutes)
app.get('/', (req, res) => {
  res.send('<h1>Welcome to Nimapara Admin Panel</h1>');
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`.bgCyan.blue);
});
