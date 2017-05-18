const db = require('./db');
const mysql = require('mysql');
const util = require('util');

exports.addOrUpdateUser = (userInfo, mediaType) => {

    this.checkUserExists(userInfo.user_id, (exists) => {
        let base = '';
        let values = [];
        let insertUpdate = '';
        if (!exists) {
            base = 'INSERT INTO users (username, %s_current, %s_completed, %s_onhold, %s_dropped, %s_planned, %s_days, mal_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        } else {
            base = 'UPDATE users SET username = ?, %s_current = ?, %s_completed = ?, %s_onhold = ?, %s_dropped = ?, %s_planned = ?, %s_days = ? WHERE mal_id = ?';
        }

        let current = (mediaType == 'anime' ? userInfo.user_watching : userInfo.user_reading);
        let planned = (mediaType == 'anime' ? userInfo.user_plantowatch : userInfo.user_plantoread);

        values = [
            userInfo.user_name,
            current,
            userInfo.user_completed,
            userInfo.user_onhold,
            userInfo.user_dropped,
            planned,
            userInfo.user_days_spent_watching,
            userInfo.user_id
        ];
        // Dumb formatting method I have to use
        base = util.format(base, mediaType, mediaType, mediaType, mediaType, mediaType, mediaType);
        insertUpdate = mysql.format(base, values);
        db.get().query(insertUpdate, (err) => {
            if (err) {
                console.log(err);
                success = false;
            }
        });
    });        
}

exports.retrieveUserMedia = (userID, mediaType, callback) => {
    let stmt = "SELECT * FROM media WHERE media_type = ?"
}

exports.deleteUser = (username, callback) => {
    let stmt = "DELETE FROM users WHERE username = ?";
    let query = mysql.format(stmt, [username]);
    db.get().query(query, (err, rows) => {
        callback(err);
    });
}

exports.checkUserExists = (userID, callback) => {
    let check = "SELECT * FROM users WHERE mal_id = ?";
    let checkQuery = mysql.format(check, [userID]);
    let result = false;

    db.get().query(checkQuery, (err, rows) => {
        if (err) {
            console.log(err);
        } else {
            if (rows.length) result = true;
        }
        callback(result);
    });
}

exports.checkUsernameExists = (username, callback) => {
    let stmt = "SELECT mal_id FROM users WHERE username = ?";
    let query = mysql.format(stmt, [username]);
    let error = false;
    let exists = false;

    db.get().query(query, (err, rows) => {
        let id = 0;
        if (err) {
            error = true;
        } else {
            if (rows.length) {
                exists = true;
                id = rows[0].mal_id;
            }
        }
        callback(error, exists, id);
    });
}