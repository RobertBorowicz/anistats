const express = require('express');
const router = express.Router();
const db = require('../../db');
const mysql = require('mysql')

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

module.exports = router;