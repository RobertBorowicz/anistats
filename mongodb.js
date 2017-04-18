var MongoClient = require('mongodb').MongoClient;

var state = {
    db : null,
    mode : null,
}

exports.connect = (url, callback) => {
    if (state.db) return callback()

    MongoClient.connect(url, (err, db) => {
      if (err) return callback(err);
      state.db = db;
      callback();
    })
}

exports.get = () => {
    return state.db;
}

exports.close = (callback) => {
    if (state.db) {
        state.db.close((err, result) => {
            state.db = null;
            state.mode = null;
            callback(err);
        });
    }
}