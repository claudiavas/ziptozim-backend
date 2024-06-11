const express = require('express');
const cors = require('cors');
const routes = require('./src/routes/routes'); // Asegúrate de que la ruta sea correcta

const app = express();
const port = 3019;

app.use(cors());
app.use(express.json());
app.use(routes);

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