require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./db/connect');
const app = express();
const PORT = process.env.PORT || 80;


app.use(cors());

app.use('/', (req, res) => {
    res.send('Hello WaaT!');
})




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