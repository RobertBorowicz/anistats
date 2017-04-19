var express = require('express');
var router = express.Router();
var db = require('../../db')

router.get('/', (req, res, next) => {
    res.end('Hello')
});

module.exports = router;