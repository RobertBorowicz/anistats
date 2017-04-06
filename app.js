var express = require('express')
var db = require('./db')

var app = express()

app.get('/', function(req, res) {
    console.log('Client connected')
    res.writeHead(200)
    res.end('Welcome')
});

app.get('/name', function(req, res) {
    handleDBConnection(req, res)
});

db.connect(db.MODE_PRODUCTION, function(err) {
    if (err)
        process.exit(1)
    else {
        app.listen(8080, function() {
            console.log('Listening on port 8080')
        });
    }
});

function handleDBConnection(req, res) {
    db.get().query("SELECT * FROM users", function(err, rows) {
        res.writeHead(200)
        res.end(rows[Math.floor(Math.random()*2)].username)
    });
}