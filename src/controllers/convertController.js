// convertController.js
const express = require('express');
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' }); // specify the destination directory
const unzipFile = require('./unzip');
const createZimFile = require('./zimWriters');

const app = express();
const port = 3019;

app.use(express.json());

app.post('/upload', upload.single('inputFile'), async (req, res) => {
    try {
        const tempDir = await unzipFile(req.file);
        res.status(200).send({ tempDir, message: 'File uploaded and unzipped.' });
    } catch (err) {
        res.status(500).send({ message: 'Error uploading and unzipping the file.' });
    }
});

app.post('/convert', async (req, res) => {
    try {
        const { tempDir, outputFile, welcomePage, favicon, language, title, description, creator, publisher } = req.body;
        await createZimFile(tempDir, outputFile, welcomePage, favicon, language, title, description, creator, publisher);
        res.status(200).send('Zip file conversion started.');
    } catch (err) {
        res.status(500).send({ message: 'Error converting the zip file.' });
    }
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});