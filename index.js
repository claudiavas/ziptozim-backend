const express = require('express');
const cors = require('cors');
const routes = require('./src/routes/routes'); // Asegúrate de que la ruta sea correcta

const app = express();

// Configuración de CORS para permitir solicitudes desde tu frontend
const corsOptions = {
        origin: '*', // Permite todas las origenes
        optionsSuccessStatus: 200 // Algunos navegadores antiguos (IE11, varios SmartTVs) se bloquean con 204
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(routes);

const port = process.env.PORT || 3000; // Usa el puerto asignado por el entorno o 3000 si no está definido
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

// Aquí creamos una ruta básica en la raíz
app.get('/', (req, res) => {
    res.send('¡Hola mundo!');
});

// middleware para manejar errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});

module.exports = app;