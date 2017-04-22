const express = require('express');
const router = express.Router();
const db = require('../../db');
const mysql = require('mysql');
const request = require('request');
const xmlParser = require('xml2js').parseString;
const userProcessor = require('../processors/userProcessor');

router.get('/anime', (req, res, next) => {
    db.get().query("SELECT * FROM anime", (err, rows) => {
        res.json(rows);
    });
});

router.post('/anime', (req, res, next) => {
    console.log("Post");
    let title = req.body.title;
    let stmt = "SELECT * FROM ?? WHERE ?? = ?";
    let inserts = ['anime', 'title', title]
    const query = mysql.format(stmt, inserts)
    console.log(query);
    db.get().query(query, (err, rows) => {
        console.log(rows);
        res.json(rows);
    });
});

router.get('/user/:username', (req, res, next) => {
    console.log('Getting user: ' + req.params.username);
    userProcessor.getUserInfo(req.params.username, '', (err, result) => {
        if (!err) console.log(result.myanimelist.anime.length);
    });
    res.json("Awwwwwwww yiss");
});

router.get('/user/:username/animestats', (req, res, next) => {
    res.json("Testing animestats endpoint");
});

router.get('/user/:username/mangastats', (req, res, next) => {
    res.json("Testing mangastats endpoint");
});

module.exports = router;