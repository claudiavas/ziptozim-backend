const { exec } = require('child_process');

function downloadWebsite() {
    const command = 'wget --mirror --convert-links --page-requisites --no-parent -P documents/websites/ https://grey-box.ca';

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error downloading website: ${error}`);
            return;
        }
        console.log(`Website downloaded: ${stdout}`);
    });
}

// Uso de la función
downloadWebsite();