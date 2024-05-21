const extract = require('extract-zip');

async function extractZip(source, target) {
    try {
        await extract(source, { dir: target });
        console.log('Extraction complete');
    } catch (err) {
        console.error('Error extracting zip file', err);
    }
}
 exports.extractZip = extractZip;