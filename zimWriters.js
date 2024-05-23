const { exec } = require('child_process');

function createZimFile(sourceDirectory, outputFile, welcomePage, favicon, language, title, description, creator, publisher) {
    const command = `${zimwriterfsPath} --welcome=${welcomePage} --favicon=${favicon} --language=${language} --title="${title}" --description="${description}" --creator=${creator} --publisher=${publisher} ${sourceDirectory} ${outputFile}`;
//a
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error al crear el archivo ZIM: ${error}`);
        } else {
            console.log('Archivo ZIM creado con éxito');
        }
    });
}

module.exports = createZimFile;