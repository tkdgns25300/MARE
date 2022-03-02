require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 80;

app.use('/', (req, res) => {
    res.send('Hello WaaT!');
})

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}...`);
})