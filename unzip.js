const extract = require('extract-zip');
const os = require('os');
const path = require('path');
const fs = require('fs');

async function unzipFile(file) {
    // Create a temporary directory in the OS temp directory
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'upload-'));

    // Extract the zip file
    await extract(file.path, { dir: path.resolve(__dirname, tempDir) });

    return tempDir;
}

module.exports = unzipFile;