const db = require('../../db');
const mysql = require('mysql');
const util = require('util');

exports.addOrUpdateUser = (userInfo, mediaType) => {

    this.checkUserExists(userInfo.user_id, (exists) => {
        let base = '';
        let values = [];
        let insertUpdate = '';
        if (!exists) {
            base = 'INSERT INTO user (username, %s_current, %s_completed, %s_onhold, %s_dropped, %s_planned, %s_days, mal_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        } else {
            base = 'UPDATE user SET username = ?, %s_current = ?, %s_completed = ?, %s_onhold = ?, %s_dropped = ?, %s_planned = ?, %s_days = ? WHERE mal_id = ?';
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

exports.checkUserExists = (userID, callback) => {
    let check = "SELECT * FROM user WHERE mal_id = ?";
    let vals = [userID];
    let checkQuery = mysql.format(check, vals);
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