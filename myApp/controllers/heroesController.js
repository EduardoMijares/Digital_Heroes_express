// Require de FS
const fs = require('fs');

// Leyendo y parseando (en array) el contenido de heroes.json
const heroes = JSON.parse(fs.readFileSync('./data/heroes.json', 'utf-8'));

const heroesController = {

    listarHeroe: (req,res) => {

        var listaHeroes = "";
        heroes.forEach(element => {
            listaHeroes += ` 
            <h2> Id: ${element.id} </h2> 
            <h2> Nombre: ${element.nombre} </h2> 
            <h2> Profesion: ${element.profesion} </h2> 
            <h2> Pais: ${element.pais} </h2> 
            <h2> Reseña: ${element.resenia} </h2> 
            `;
        });
        res.send(listaHeroes);
    },
    listarProfesion: (req,res) => {

        let heroe = heroes.find(element => element.id == req.params.id);
        if(req.params.id <= heroes.length){
        res.send(
            `Hola, mi nombre es ${heroe.nombre} y mi profesion es ${heroe.profesion}
            `);
        }else {
            res.send("No tenemos en nuestra base ningún héroe ni heroína con ese id");
        }
    },
    listarResenia: (req,res) => {
        // Acá lo primero será encontrar al héroe que corresponda
        let heroe = heroes.find(element => element.id == req.params.id);
        if(req.params.id >= heroes.length && req.params.resenia == "resenia" ){
            res.send("No tenemos en nuestra base ningún héroe ni heroína con ese id")
        }else if(req.params.id <= heroes.length && req.params.resenia == "resenia"  ){
            res.send("Mi nombre es " + heroe.nombre + " y mi resenia es: \n\n " + heroe.resenia);
        }else if(req.params.id <= heroes.length && req.params.resenia != "resenia") {
             res.send("Mi nombre es " + heroe.nombre + " y mi resenia es: \n\n " + heroe.resenia.slice(0,30))
        }
    }
}

module.exports = heroesController;