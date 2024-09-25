import mongoose from 'mongoose'; // Use ES module syntax
import colors from 'colors'; // Ensure colors is also imported

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected successfully: ${conn.connection.host}`.bgGreen.black); // Correct logging of connection host
  } catch (error) {
    console.log(`Error while connecting to database: ${error}`.bgRed.white); 
  }
};

export default connectDB; 
