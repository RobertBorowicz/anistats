var mysql = require('mysql');

var state = {
    pool :  null,
    mode : null,
}

exports.connect = function(mode, done) {
    state.pool = mysql.createPool({
        connectionLimit : 100,
        host : 'localhost',
        user : 'root',
        password : '',
        database : mode === exports.MODE_PRODUCTION ? 'anilist_schema' : 'anilist_test'
    })
    state.mode = mode;
    done();
}

exports.get = function() {
    return state.pool;
}