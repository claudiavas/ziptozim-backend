const { zimCreator } = require('../utils/zimwriters');
const express = require('express');
const router = express.Router();

app.get('/ourwebsite', (req, res) => {
    try {
        res.sendFile(__dirname + '/ourwebsite/index.html');
        res.status(200).send('Website loaded successfully.');
    } catch (err) {
        res.status(500).send({ message: 'Error loading the website.' });
    }
});

module.exports = router;