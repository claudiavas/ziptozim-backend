const express = require('express');
const zimWriters = require('./zimWriters');

const app = express();
const port = 3019;

//Parameters for testing
const sourceDirectory = './ourwebsite'; // El directorio con los archivos que quieres incluir en el archivo ZIM
const outputFile = './OurWebsite.zim'; // La ruta donde quieres guardar el archivo ZIM
const zimwriterfsPath = './zimwriterfs'; // La ruta al ejecutable zimwriterfs
const welcomePage = 'index.html'; // La página de bienvenida
const favicon = 'favicon.png'; // La ilustración
const language = 'eng'; // El código de idioma
const title = 'Our Website'; // El título del ZIM
const description = ' '; // La descripción del ZIM
const creator = 'Wikipedia'; // El creador del ZIM
const publisher = 'Me'; // El editor del ZIM

createZimFile(sourceDirectory, outputFile, welcomePage, favicon, language, title, description, creator, publisher);

app.use(express.json());

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});