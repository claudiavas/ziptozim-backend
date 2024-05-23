const request = require('supertest');
const app = require('./index'); // Importa tu app de Express

describe('Test /upload endpoint', () => {
    it('should upload and unzip the file', async () => {
        const res = await request(app)
            .post('/upload')
            .attach('inputFile', 'path/to/your/test.zip'); // Reemplaza 'path/to/your/test.zip' con la ruta a tu archivo de prueba

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('tempDir');
        expect(res.body.message).toEqual('File uploaded and unzipped.');
    });
});

describe('Test /convert endpoint', () => {
    it('should start the zip file conversion', async () => {
        const res = await request(app)
            .post('/convert')
            .send({
                tempDir: 'path/to/your/tempDir', // Reemplaza 'path/to/your/tempDir' con la ruta a tu directorio temporal
                outputFile: 'testOutput',
                welcomePage: 'index.html',
                favicon: 'favicon.png',
                language: 'eng',
                title: 'Our Website',
                description: ' ',
                creator: 'Wikipedia',
                publisher: 'Me'
            });

        expect(res.statusCode).toEqual(200);
        expect(res.text).toEqual('Zip file conversion started.');
    });
});