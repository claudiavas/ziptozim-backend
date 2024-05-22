const express = require('express');

const app = express();
const port = 3019;
const createZimFile = require('./zimWriters');

app.use(express.json());


createZimFile();;


app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});