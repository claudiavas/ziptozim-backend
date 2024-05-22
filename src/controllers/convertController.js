const express = require('express');
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' }); // specify the destination directory

const app = express();
const port = 3019;
const createZimFile = require('./zimWriters');

app.use(express.json());

app.post('/convert', upload.single('inputFile'), async (req, res) => {
    try {
        const { outputFile, welcomePage, favicon, language, title, description, creator, publisher } = req.body;
        const inputFile = req.file; // access the uploaded file

        await createZimFile(inputFile.path, outputFile, welcomePage, favicon, language, title, description, creator, publisher);

        res.status(200).send('Website conversion started.');
    } catch (err) {
        res.status(500).send({ message: 'Error converting the website.' });
    }
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});