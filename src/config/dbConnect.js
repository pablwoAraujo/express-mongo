import mongoose from 'mongoose';

async function dbConnect(){
  mongoose.connect("mongodb://mongoadmin:password@localhost:27017/bookstore?retryWrites=true&authSource=admin")

  return mongoose.connection
}

export default dbConnect;