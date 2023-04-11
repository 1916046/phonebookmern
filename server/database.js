const mongoose = require('mongoose');

const DB_URI = 'mongodb://127.0.0.1:27017/mydatabase';

const connectDB = async () => {
  try {
    await mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Database connected');
  } catch (err) {
    console.log('Error connecting to database:', err);
  }
};

module.exports = connectDB;
