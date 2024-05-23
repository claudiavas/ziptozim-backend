const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const archiver = require('archiver');

async function scrapeAndPack(url, outputZipPath) {
    try {
        // Fetch the page
        const response = await axios.get(url);
        
        // Parse the page with Cheerio
        const $ = cheerio.load(response.data);
        
        // Extract the data you're interested in
        // For example, let's extract all the text in <p> tags
        const data = [];
        $('p').each((i, element) => {
            data.push($(element).text());
        });
        
        // Write the data to a file
        const outputFilePath = 'output.txt';
        fs.writeFileSync(outputFilePath, data.join('\n'));
        
        // Create a zip file
        const output = fs.createWriteStream(outputZipPath);
        const archive = archiver('zip', {
            zlib: { level: 9 } // Sets the compression level.
        });
        archive.pipe(output);
        archive.file(outputFilePath, { name: 'output.txt' });
        await archive.finalize();
        
        console.log('Scraping and packing complete');
    } catch (err) {
        console.error('Error scraping and packing', err);
    }
}

// Use the function
// scrapeAndPack('https://example.com', 'output.zip');

module.exports = scrapeAndPack;