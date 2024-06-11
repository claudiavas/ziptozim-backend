const { spawn } = require('child_process');
const path = require('path');

let zimwriterfsPath = 'zimwriterfs';

exports.createZimFile = function(sourceDirectory, outputFile, welcomePage, illustration, language, title, description, creator, publisher) {
    return new Promise((resolve, reject) => {
        const outputFilePath = path.join(sourceDirectory, outputFile); // Add the sourceDirectory path to the outputFile
        const command = [`--welcome=${welcomePage}`, `--illustration=${illustration}`, `--language=${language}`, `--title="${title}"`, `--description="${description}"`, `--creator=${creator}`, `--publisher=${publisher}`, sourceDirectory, outputFilePath];
        console.log("Zimwriterfs command", command)
        const zimwriterfs = spawn(zimwriterfsPath, command);
        zimwriterfs.stdout.on('data', (data) => {
            console.log(`stdout: ${data}`);
        });

        zimwriterfs.stderr.on('data', (data) => {
            console.error(`stderr: ${data}`);
        });

        zimwriterfs.on('close', (code) => {
            console.log(`child process exited with code ${code}`);
            if (code !== 0) {
                reject(new Error(`zimwriterfs exited with code ${code}`));
            } else {
                resolve();
            }
        });
    });
}