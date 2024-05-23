const { exec } = require('child_process');
const path = require('path');

function downloadWebsite(websiteUrl) {
    const projectRoot = path.resolve(__dirname, '..'); // Obtiene el directorio raíz del proyecto
    const command = `wget --mirror --convert-links --page-requisites --no-parent -P ${projectRoot} ${websiteUrl}`;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error downloading website: ${error}`);
            return;
        }
        console.log(`Website downloaded: ${stdout}`);
    });
}

// Uso de la función
downloadWebsite('https://grey-box.ca');

module.exports = downloadWebsite;