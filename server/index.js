const express = require('express')
const cors = require('cors')
const app = express();
const phonebookRoutes = require("./routes/PhoneBook");

const mongoose = require('mongoose');
const connectDB = require('./database');

connectDB(); 

app.use(express.json())
app.use(cors())
app.use('/api/v1', phonebookRoutes);
const PORT = 8080
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}...`)
})