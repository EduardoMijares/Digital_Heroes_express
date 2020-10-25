// Require de Express
const express = require('express');

// Ejecución de Express
const app = express();

// Require de rutas
const rutasCreditos = require('./routes/creditos');
const rutasMain = require('./routes/main');
const rutasHeroes = require('./routes/heroes');

// Levantando el Servidor en el puerto 3030
app.listen(3030, () => console.log('Server running in 3030 port'));

// Ruta Raíz / ➝ Home
app.use('/', rutasMain);

// Ruta /heroes ➝ se envía todo el array y Express lo parsea para el browser como JSON :D
app.use('/heroes', rutasHeroes);
	
// Ruta /heroes/n ➝ se envía el nombre y profesión del héroe solicitado
app.use('/heroes/:id', rutasHeroes);

// Ruta /heroes/n/bio ➝ se envía la bio del héroe solicitado
app.use('/heroes/:id/:bio?', rutasHeroes);

// Ruta Créditos
app.use('/',rutasCreditos);


// Ruta... ¿Pára qué sirve esto?
app.get('*', (req, res) => {
	res.status(404).send('404 not found. <br> ¡WE GOT A PROBLEM!');
});

module.exports = app;
