require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require("cookie-parser");
const connectDB = require('./db/connect');
const userRouter = require('./routes/userRoute');
const recipeRouter = require('./routes/recipeRoute');
const app = express();
const PORT = process.env.PORT || 80;


// middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());


// routes
app.use('/users', userRouter);
app.use('/recipe', recipeRouter);


// Start Server
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}...`);
        });
    } catch (error) {
        console.error(error.message);
    }
}

start();