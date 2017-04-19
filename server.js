// Local files
const db = require('./db')
const config = require('./config')

const express = require('express')
const bodyParser = require('body-parser')

const index = require('./app/routes/index')
const api = require('./app/routes/api')

const app = express()

const port = 8080;

// View engine
// app.set('views', __dirname + '/public');
// app.set('view engine', 'ejs');
// app.engine('html', require('ejs').renderFile);

app.use(express.static(__dirname + '/public'));

// Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

// Routes
app.use('/', index)
app.use('/api', api)

db.connect(db.MODE_TEST, (err) => {
    if (err) {
        console.log(err);
        process.exit(1)
    } else {
        app.listen(port, () => {
        console.log('Listening on port ' + port);
    });
    }
});

// app.get('/', function(req, res) {
//     console.log('Client connected')
//     res.writeHead(200)
//     res.end('Welcome')
// });

// app.get('/test', function(req, res) {
//     handleDBConnection(req, res)
// });

// app.get('/anime/:id', function(req, res) {
//     res.redirect('http://www.myanimelist.net/anime/' + req.params.id)
// });

// db.connect(db.MODE_TEST, function(err) {
//     if (err)
//         process.exit(1)
//     else {
//         app.listen(8080, function() {
//             console.log('Listening on port 8080')
//         });
//     }
// });

// function handleDBConnection(req, res) {
//     db.get().query("SELECT * FROM anime", function(err, rows) {
//         //res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"})
//         // results = JSON.stringify(rows)
//         // for (var k in rows[0]) {
//         //     if (rows[0][k]) {
//         //         res.write(rows[0][k].toString()+'<br/>', 'utf8')
//         //     }            
//         // }
//         res.json(rows)
//         //res.end(rows[Math.floor(Math.random()*2)].username)
//     });
// }

// app.get('/test', function(req, res) {
//     var collection = db.get().collection('test')
//     collection.find().toArray(function(err, docs) {
//         res.json({test : docs})
//     })
// })

// db.connect(config.mongo.url, function(err) {
//     if (err) {
//         console.log("Error")
//         process.exit(1)
//     } else {
//         // var collection = db.get().collection('test');
//         // collection.insertMany([
//         //     {test1 : 1}, {test2 : 2}, {test3 : 3}
//         // ], function(err, result) {
//         //     console.log('Inserted documents');
//         // });
//         app.listen(config.server.port, function() {
//             console.log("Listening on port " + config.server.port)
//         });
//     }
// })