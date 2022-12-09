const express = require('express');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const dbConnection = require('./dbConfig/dbconfig');
const errorMiddleware = require('./middlewares/error');

const user = require('./routes/userRoute');
const task = require('./routes/taskRoute');


const app = express();
app.use(express.json());
app.use(cookieParser());


// Database
dbConnection();

// Routes
app.use('/user', user);
app.use('/task', task);

// Error Middleware
app.use(errorMiddleware)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on the port: ${PORT}`);
})