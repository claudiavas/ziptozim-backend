const express = require('express');
const createZimFile = require('./zimWriters');
const unzipFile = require('./unzip');
const scrapeAndPack = require('./webScrapper');

const app = express();
const port = 3019;

// Parameters for testing unzipFile
const file = {
    path: './output.zip'
};

// Test unzipFile
// unzipFile(file).then((tempDir) => {
//     console.log('Unzipping completed. Temp directory:', tempDir);
// }).catch((error) => {
//     console.error('Error during unzipping:', error);
// });

//Parameters for testing CreateZimFile
const sourceDirectory = './www.grey-box.ca'; // El directorio con los archivos que quieres incluir en el archivo ZIM
const outputFile = './Grey-Box.zim'; // La ruta donde quieres guardar el archivo ZIM
const welcomePage = 'index.htm'; // La página de bienvenida
const favicon = 'favicon.jpg'; // La ilustración
const language = 'eng'; // El código de idioma
const title = 'Our Website'; // El título del ZIM
const description = ' '; // La descripción del ZIM
const creator = 'Wikipedia'; // El creador del ZIM
const publisher = 'Me'; // El editor del ZIM

createZimFile(sourceDirectory, outputFile, welcomePage, favicon, language, title, description, creator, publisher);

// Test ScrapeAndPack
// scrapeAndPack('https://grey-box.ca', 'output.zip')


app.use(express.json());

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});

module.exports = app;