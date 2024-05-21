const { spawn } = require('child_process');

const zimCreator = (inputFolderPath, outputZimFilePath) => {
  return new Promise((resolve, reject) => {
    // Define the Docker command and options
    const command = 'docker';
    const options = ['run', '--rm', '-v', `${inputFolderPath}:${inputFolderPath}`, '-v', `${outputZimFilePath}:${outputZimFilePath}`, 'darkenvy/zimwriterfs', inputFolderPath, outputZimFilePath];

    // Spawn the Docker process
    const zimWriter = spawn(command, options);

    // Set a timeout
    const timeout = setTimeout(() => {
      zimWriter.kill(); // This will trigger 'close' event
      reject(new Error("Process timed out"));
    }, 600000); // Timeout after 600000 milliseconds (600 seconds)

    // Handle Docker output
    zimWriter.stdout.on("data", (data) => {
      console.log(`Docker stdout: ${data}`);
    });

    // Handle Docker errors
    zimWriter.stderr.on("data", (data) => {
      console.error(`Docker stderr: ${data}`);
    });

    // Handle Docker exit
    zimWriter.on("close", (code) => {
      console.log(`Docker exited with code ${code}`);
      if (code !== 0) {
        reject(new Error(`Docker exited with code ${code}`));
      } else {
        resolve();
      }
    });
  });
};

module.exports = { zimCreator };