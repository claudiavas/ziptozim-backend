const express = require('express');
const multer  = require('multer');
const extract = require ('extract-zip');
const upload = multer({ dest: 'uploads/' }); // specify the destination directory
const os = require('os');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3019;
const createZimFile = require('./zimWriters');

app.use(express.json());

app.post('/convert', upload.single('inputFile'), async (req, res) => {
    try {
        const { outputFile, welcomePage, favicon, language, title, description, creator, publisher } = req.body;
        const inputFile = req.file; // access the uploaded file

        // Create a temporary directoryin the OS temp directory
        const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'upload-'));
       
        // Extract the zip file
        await extract(inputFile.path, { dir: path.resolve(__dirname, tempDir) });

        await createZimFile(inputFile.path, outputFile, welcomePage, favicon, language, title, description, creator, publisher);

        res.status(200).send('Zip file conversion started.');
    } catch (err) {
        res.status(500).send({ message: 'Error converting the zip file.' });
    }
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});