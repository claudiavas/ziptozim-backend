const express = require('express');
const request = require('supertest');
const app = require('./index'); // Importa tu app de Express

// Verifica si la aplicación ya está escuchando en un puerto
if (!app.listening) {
    app.listen(0); // 0 significa que el sistema operativo asignará un puerto aleatorio disponible
}

const agent = request.agent(app); // Pasa la aplicación a Supertest

describe('Test /upload endpoint', () => {
    it('should upload and unzip the file', () => { // Elimina 'async'
        return agent // Devuelve la promesa
            .post('/upload')
            .attach('inputFile', 'path/to/your/test.zip') // Reemplaza 'path/to/your/test.zip' con la ruta a tu archivo de prueba
            .then(res => { // Maneja la respuesta en un bloque 'then'
                expect(res.statusCode).toEqual(200);
                expect(res.body).toHaveProperty('tempDir');
                expect(res.body.message).toEqual('File uploaded and unzipped.');
            });
    });
});

describe('Test /convert endpoint', () => {
    it('should start the zip file conversion', () => { // Elimina 'async'
        return agent // Devuelve la promesa
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
            })
            .then(res => { // Maneja la respuesta en un bloque 'then'
                expect(res.statusCode).toEqual(200);
                expect(res.text).toEqual('Zip file conversion started.');
            });
    });
});