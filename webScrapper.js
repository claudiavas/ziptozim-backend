const puppeteer = require('puppeteer');

async function downloadWebsite(websiteUrl) {
    const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();
    await page.goto(websiteUrl, {waitUntil: 'networkidle2'});
    const content = await page.content();
    await browser.close();
    return content;
}

// Uso de la función
downloadWebsite('https://grey-box.ca').then(content => {
    console.log(content);
});

module.exports = downloadWebsite;