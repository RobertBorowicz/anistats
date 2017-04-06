var mysql = require('mysql');
var config = require('./config')

var state = {
    pool :  null,
    mode : null,
}

exports.connect = function(mode, done) {
    state.pool = mysql.createPool({
        connectionLimit : 100,
        host : config.database.host,
        user : config.database.user,
        password : config.database.password,
        database : mode === exports.MODE_PRODUCTION ? 'anilist_schema' : 'anilist_test'
    });
    state.mode = mode;
    done();
}

exports.get = function() {
    return state.pool;
}