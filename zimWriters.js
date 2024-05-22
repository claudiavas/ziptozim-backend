const { exec } = require('child_process');

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

const command = `${zimwriterfsPath} --welcome=${welcomePage} --favicon=${favicon} --language=${language} --title="${title}" --description="${description}" --creator=${creator} --publisher=${publisher} ${sourceDirectory} ${outputFile}`;

function createZimFile() {
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error al crear el archivo ZIM: ${error}`);
        } else {
            console.log('Archivo ZIM creado con éxito');
        }
    });
}

module.exports = createZimFile;