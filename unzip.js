const path = require('path');
const fs = require('fs');
const util = require('util');
const unlinkAsync = util.promisify(fs.unlink);
const extract = require('extract-zip');

async function unzipFile(file) {
    // Define the directory where the files will be extracted
    const extractDir = path.join(__dirname, 'temp');

    // Check if the directory exists, if not, create it
    if (!fs.existsSync(extractDir)){
        fs.mkdirSync(extractDir);
    }

    // Extract the zip file
    await extract(file.path, { dir: extractDir });

    // Delete the original zip file
    await unlinkAsync(file.path);
}

module.exports = unzipFile;