var mysql = require('mysql');
var config = require('./config')

var state = {
    pool :  null,
    mode : null,
}

exports.MODE_PRODUCTION = 'mode_prod';
exports.MODE_TEST = 'mode_test'

exports.connect = (mode, done) => {
    state.pool = mysql.createPool({
        connectionLimit : 100,
        host : config.mysql.host,
        user : config.mysql.user,
        password : config.mysql.password,
        database : mode === exports.MODE_PRODUCTION ? config.mysql.production : config.mysql.test
    });
    state.mode = mode;
    done();
}

exports.get = () => {
    return state.pool;
}