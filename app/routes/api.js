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
    console.log('Getting full user info for: ' + req.params.username);
    userProcessor.getFullUserInfo(req.params.username, (err, data) => {
        if (!err) {
            res.json(data);
        } else {
            console.log('Error: ' + data);
        }
    });
})

router.get('/user/:username/anime', (req, res, next) => {
    console.log('Getting anime for user: ' + req.params.username);
    // userProcessor.getUserInfo(req.params.username, 'anime', (err, result) => {
    //     if (!err) {
    //         res.json(result);
    //     } else {
    //         console.log(result);
    //     }
    // });
});

router.get('/user/:username/manga', (req, res, next) => {
    console.log('Getting manga for user: ' + req.params.username);
    // userProcessor.getUserInfo(req.params.username, 'manga', (err, result) => {
    //     if (!err) {
    //         res.json(result);
    //     } else {
    //         console.log(result);
    //     }
    // });
});

router.get('/user/:username/animestats', (req, res, next) => {
    res.json("Testing animestats endpoint");
});

router.get('/user/:username/mangastats', (req, res, next) => {
    res.json("Testing mangastats endpoint");
});

module.exports = router;