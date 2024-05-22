const { spawn } = require('child_process');

function createZimFile(welcome, favicon, language, title, description, creator, publisher, sourceDir, outputFile) {
    const command = '/zimwriterfs_local/zimwriterfs';
    const options = [
        `--welcome=${welcome}`,
        `--favicon=${favicon}`,
        `--language=${language}`,
        `--title=${title}`,
        `--description=${description}`,
        `--creator=${creator}`,
        `--publisher=${publisher}`,
        sourceDir,
        outputFile
    ];

    const zimWriter = spawn(command, options);

    zimWriter.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });

    zimWriter.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });

    zimWriter.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
    });
}

module.exports = createZimFile;