const { spawn } = require('child_process');
const crypto = require('crypto');

let containerName;

function generateContainerName() {
    containerName = 'container_' + crypto.randomBytes(4).toString('hex');
    return containerName;
}

exports.containerName = containerName;

function removeOldContainers(imageName, callback) {
    const child = spawn('docker', ['ps', '-a', '--format', '{{.ID}} {{.Image}}']);

    let containerData = '';
    child.stdout.on('data', (data) => {
        containerData += data;
    });

    child.on('close', (code) => {
        if (code !== 0) {
            console.error(`Failed to get list of old containers.`);
            callback(false);
        } else {
            const containers = containerData.trim().split('\n');
            containers.forEach(container => {
                const [id, image] = container.split(' ');
                if (image === imageName) {
                    const removeChild = spawn('docker', ['rm', '-f', id]);
                    removeChild.on('close', (removeCode) => {
                        if (removeCode !== 0) {
                            console.error(`Failed to remove container with ID ${id}`);
                        }
                    });
                }
            });
            callback(true);
        }
    });
}


function checkExists(type, name, callback) {
    const child = type === 'image' ? spawn('docker', ['inspect', '-f', '{{.Id}}', name]) : spawn('docker', [type, 'ls', '-a', '-q', '-f', `name=${name}`]);

    let output = '';
    child.stdout.on('data', (data) => {
        output += data;
    });

    child.on('close', (code) => {
        callback(code === 0 && output.trim() !== '');
    });
}

function createImage(imageName, callback) {
    const child = spawn('docker', ['build', '-t', imageName, '.']);

    child.on('close', (code) => {
        callback(code === 0);
    });
}

function createContainer(imageName, callback) {
    const containerName = generateContainerName();
    const child = spawn('docker', ['run', '-d', '--name', containerName, imageName, 'tail', '-f', '/dev/null']);

    child.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });

    child.on('close', (code) => {
        if (code !== 0) {
            console.error(`Failed to create Docker container`);
            callback(null);
        } else {
            console.log('Docker container created successfully');
            callback(containerName);
        }
    });
}

function runZimTools() {
    const imageName = 'zim-tools_image:latest';

    checkExists('image', imageName, function(imageExists) {
        if (!imageExists) {
            console.log(`Image ${imageName} does not exist. Creating...`);
            createImage(imageName, function(success) {
                if (!success) {
                    console.error(`Failed to create Docker image`);
                    return;
                }

                console.log('Docker image created successfully');
                removeOldContainers(imageName, function(success) {
                    if (success) {
                        createContainer(imageName, function(createdContainerName) {
                            if (createdContainerName) {
                                console.log('Container created successfully with name:', createdContainerName);
                            } else {
                                console.log('Failed to create container');
                            }
                        });
                    } else {
                        console.log('Failed to remove old containers');
                    }
                });
            });
        } else {
            console.log(`Image ${imageName} already exists. Skipping creation.`);
            removeOldContainers(imageName, function(success) {
                if (success) {
                    createContainer(imageName, function(createdContainerName) {
                        if (createdContainerName) {
                            console.log('Container created successfully with name:', createdContainerName);
                        } else {
                            console.log('Failed to create container');
                        }
                    });
                } else {
                    console.log('Failed to remove old containers');
                }
            });
        }
    });
}


const zimCreator = (websiteUrl, outputZimFilePath) => {
  return new Promise((resolve, reject) => {
    // Run zim-tools to get the Dockerfile
    runZimTools();

    // Define the zim-tools command and options
    const command = 'docker';
    const options = ['exec', 'containerName', 'ziptozim', `--url=${websiteUrl}`, `--output=${outputZimFilePath}`];

    // Spawn the zim-tools process
    const zimTools = spawn(command, options);

    // Set a timeout
    const timeout = setTimeout(() => {
      zimTools.kill(); // This will trigger 'close' event
      reject(new Error("Process timed out"));
    }, 600000); // Timeout after 600000 milliseconds (600 seconds)

    // Handle zim-tools output
    zimTools.stdout.on("data", (data) => {
      console.log(`zim-tools stdout: ${data}`);
    });

    // Handle zim-tools errors
    zimTools.stderr.on("data", (data) => {
      console.error(`zim-tools stderr: ${data}`);
    });

    // Handle zim-tools exit
    zimTools.on("close", (code) => {
      console.log(`zim-tools exited with code ${code}`);
      if (code !== 0) {
        reject(new Error(`zim-tools exited with code ${code}`));
      } else {
        resolve();
      }
    });
  });
};

module.exports = { zimCreator, runZimTools };
