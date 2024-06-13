const path = require('path');
const fs = require('fs');
const util = require('util');
const unlinkAsync = util.promisify(fs.unlink);
const extract = require('extract-zip');

async function unzipFile(file, extractDir) {
    // Check if the file is defined
    if (!file) {
        throw new Error('File is undefined');
    }

    // Check if the directory exists, if not, create it
    if (!fs.existsSync(extractDir)){
        fs.mkdirSync(extractDir);
        console.log(`Created directory ${extractDir}`);
    }

    // Extract the zip file
    await extract(file.path, { dir: extractDir });
    console.log(`Extracted zip file to ${extractDir}`);

    // Delete the original zip file
    await unlinkAsync(file.path);
    console.log(`Deleted zip file ${file.path}`);
}

module.exports = unzipFile;