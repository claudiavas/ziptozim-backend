import * as fs from 'fs';
import * as util from 'util';
import extract from 'extract-zip';
import path from 'path';

const unlinkAsync = util.promisify(fs.unlink);

/**
 * Asynchronously unzips a file to a specified directory.
 * It checks if the file and directory exist, creates the directory if it doesn't exist,
 * extracts the zip file to the directory, and then deletes the original zip file.
 * 
 * @param {Object} file - The file object to be unzipped. This object must have a `path` property.
 * @param {string} extractDir - The directory path where the file will be extracted.
 * 
 * @throws {Error} Throws an error if the file object is undefined.
 * 
 * @example
 * const file = { path: '/path/to/your/file.zip' };
 * const extractDir = '/path/to/extract/directory';
 * await unzipFile(file, extractDir);
 */
async function unzipFile(file: { path: string }, tempDir: string): Promise<{sourceDirectory: string, htmlDirectory: string}> {
    if (!file) {
        throw new Error('File is undefined');
    }

    const timestamp: number = Date.now(); // Get the current timestamp
    console.log("timestamp", timestamp);
    const sourceDirectory: string = path.resolve(tempDir, String(timestamp));
    fs.mkdirSync(sourceDirectory, { recursive: true }); // Ensure the source directory exists
    console.log(`Created source directory ${sourceDirectory}`);

    const htmlDirectory: string = path.join(sourceDirectory, 'html');
    fs.mkdirSync(htmlDirectory, { recursive: true }); // Ensure the html directory exists
    console.log(`Created HTML directory ${htmlDirectory}`);

    await extract(file.path, { dir: htmlDirectory });
    console.log(`Extracted zip file to ${htmlDirectory}`);

    await unlinkAsync(file.path);
    console.log(`Deleted zip file ${file.path}`);

    return { sourceDirectory, htmlDirectory };
}

export default unzipFile;