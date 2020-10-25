// Require de Express
let express = require('express');

// Require de Router
let router = express.Router();

// Require de controllers
const creditosController = require('../controllers/creditosController');

router.get('/creditos', creditosController.creditos);

module.exports = router;