var express = require('express');
var router = express.Router();
var db = require('../database/db')

router.get('/', (req, res, next) => {
    res.end('Anistats')
});

module.exports = router;