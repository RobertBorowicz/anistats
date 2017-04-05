var mysql = require('mysql');
var express = require('express');
var conn = mysql.createPool({
    connectionLimit : 100,
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'anilist_schema'
});

var app = express();

function handleDBConnection(req, res) {
    pool.getConnection(function(err, conn) {
        conn.query("SELECT * FROM users", function(err, rows) {
            conn.release();
            res.writeHead(200);
            res.end(rows[Math.floor(Math.random()*2)].username);
        });

        //conn.on('error', function(err) {
            //res.json({'code' : 100, 'status' : 'Error in DB connection'});
            //cleanup()
            //return;
        //});
    });
}

app.get('/', function(req, res) {
    console.log('Client connected');
    res.writeHead(200);
    res.end('Welcome');
});

app.get('/name', function(req, res) {
    handleDBConnection(req, res);
});

app.listen(8080);