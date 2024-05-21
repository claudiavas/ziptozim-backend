const { zimCreator } = require('../utils/zimcreator');
const express = require('express');
const router = express.Router();

app.get('/convertWebsite', async (req, res, next) => {
    try {
        // Get the websiteUrl and outputZimFilePath from req.query
        const { websiteUrl, outputZimFilePath } = req.query;
        await zimCreator(websiteUrl, outputZimFilePath);
        res.send('Website conversion started.');
    } catch (err) {
        next(err);
    }
});

module.exports = router;