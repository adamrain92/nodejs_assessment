var express = require('express');
var router = express.Router();

let teacher = require('../controllers/index');

/* GET home page. */
router.get('/', teacher.index);

module.exports = router;
