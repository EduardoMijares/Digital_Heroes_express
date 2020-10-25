// Require de Express
let express = require('express');

// Require de Router
let router = express.Router();

// Require de controllers
const heroesController = require('../controllers/heroesController');

router.get('/', heroesController.listarHeroe);

router.get('/:id', heroesController.listarProfesion);

router.get('/:id/:resenia?', heroesController.listarResenia);

module.exports = router;