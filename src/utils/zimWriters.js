const { exec } = require('child_process');

const sourceDirectory = './zimredirection'; // El directorio con los archivos que quieres incluir en el archivo ZIM
const outputFile = './OurWebsite.zim'; // La ruta donde quieres guardar el archivo ZIM
const zimwriterfsPath = 'zimwriterfs'; // La ruta al ejecutable zimwriterfs

const welcomePage = 'index.html'; // La página de bienvenida
const illustration = 'favicon.png'; // La ilustración
const language = 'eng'; // El código de idioma
const title = 'Our Website'; // El título del ZIM
const description = 'A description of our website'; // La descripción del ZIM
const creator = 'Your Name'; // El creador del ZIM
const publisher = 'Your Company'; // El editor del ZIM

const command = `${zimwriterfsPath} -w ${welcomePage} -I ${illustration} -l ${language} -t "${title}" -d "${description}" -c "${creator}" -p "${publisher}" ${sourceDirectory} ${outputFile}`;

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