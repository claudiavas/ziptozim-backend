const express = require('express');
const zimWriters = require('./zimWriters');

const app = express();
const port = 3019;
zimWriters()
app.use(express.json());

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});