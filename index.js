const express = require('express');

const app = express();
const port = 3019;

app.use(express.json());

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});