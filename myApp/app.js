// Require de Express
const express = require ('express');

// Require de FS
const fs = require('fs');

// Ejecución de Express
const app = express();

// Levantando el Servidor en el puerto 3030
app.listen(3030, () => console.log('Server running in 3030 port'));

// Leyendo y parseando (en array) el contenido de heroes.json
const heroes = JSON.parse(fs.readFileSync('./data/heroes.json', 'utf-8'));

// Ruta Raíz / ➝ Home
app.get('/', (req,res) => {
	res.send("Ni Superman, IronMan o La Mujer Maravilla son tan importantes cómo las y los Heroes de carne y hueso que encontrarás en este sitio. Esperamos que ellas y ellos te sirvan como inspiración para poder cumplir tus objetivos. Recuerda: ¡nunca pares de creer en ti!.");
});

// Ruta /heroes ➝ se envía todo el array y Express lo parsea para el browser como JSON :D
app.get('/heroes', (req,res) => {
  var listaHeroes = "";
	heroes.forEach(element => {
		listaHeroes += ` 
		<h2> Id: ${element.id} <\h2> 
		<h2> Nombre: ${element.nombre} <\h2> 
		<h2> Profesion: ${element.profesion} <\h2> 
		<h2> Pais: ${element.pais} <\h2> 
		<h2> Reseña: ${element.resenia} <\h2> 
`;
	});
	res.send(listaHeroes);
});

// Ruta /heroes/n ➝ se envía el nombre y profesión del héroe solicitado
app.get('/heroes/:id', (req,res) => {
	// Acá lo primero será encontrar al héroe que corresponda
	let heroe = heroes.find(element => element.id == req.params.id);
	if(req.params.id <= heroes.length){
	res.send(
		`Hola, mi nombre es ${heroe.nombre} y mi profesion es ${heroe.profesion}`);
	}else {
		res.send("El heroe solicitado no fue encontrado")
	}
	
	// Si se encuentra al héroe se envía el nombre y su profesión
	// Si NO se encuentra se envía el mensaje de no encontrado
});

// Ruta /heroes/n/bio ➝ se envía la bio del héroe solicitado
app.get('/heroes/:id/:resenia?', (req,res) => {
	// Acá lo primero será encontrar al héroe que corresponda
	let heroe = heroes.find(element => element.id == req.params.id);
	if(req.params.id >= heroes.length && req.params.resenia == "resenia" ){
		res.send("No tenemos en nuestra base ningún héroe ni heroína con ese id")
	}else if(req.params.id <= heroes.length && req.params.resenia == "resenia"  ){
		res.send("Mi nombre es " + heroe.nombre + " y mi resenia es: \n\n " + heroe.resenia);
	}else if(req.params.id <= heroes.length && req.params.resenia != "resenia") {
		 res.send("Mi nombre es " + heroe.nombre + " y mi resenia es: \n\n " + heroe.resenia.slice(0,30))
	}

	// Si NO se encuentra al héroe se envía un mensaje
	// Si se encuentra al héroe:
		// Se pregunta si vino el parámetro Y el valor esperado y se envía la información
		// Si nó vino el parámetro se envía el mensaje de error
	
});



// Ruta Créditos
app.get('/creditos', (req,res) => {
	res.send("Copyright a Digital House y Eduardo Mijares... Derechos reservados");
})

// Ruta... ¿Pára qué sirve esto?
app.get('*', (req, res) => {
	res.status(404).send('404 not found. <br> ¡WE GOT A PROBLEM!');
});

module.exports = app;
