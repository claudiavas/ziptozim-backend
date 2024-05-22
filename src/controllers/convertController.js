const { createZimFile } = require('../utils/zimwriters');
const express = require('express');
const router = express.Router();

router.get('/convert', async (req, res) => {
    try {
        // Get the parameters from req.query
        const { sourceDirectory, outputFile, welcomePage, favicon, language, title, description, creator, publisher } = req.body;

        // Use createZimFile to create the ZIM file
        await createZimFile(sourceDirectory, outputFile, welcomePage, favicon, language, title, description, creator, publisher);

        // Send a success response
        res.status(200).send('Website conversion started.');
    } catch (err) {
        // Send an error response
        res.status(500).send({ message: 'Error converting the website.' });
    }
});

module.exports = router;