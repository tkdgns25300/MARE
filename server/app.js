require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 80;


app.use(cors());

app.use('/', (req, res) => {
    res.send('Hello WaaT!');
})

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}...`);
})