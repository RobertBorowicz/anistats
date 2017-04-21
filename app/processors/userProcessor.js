const db = require('../../db');
const mysql = require('mysql');
const util = require('util');
const request = require('request');
const xmlParser = require('xml2js').parseString;

exports.getUserInfo = (username, mediaType, callback) => {
    let url = util.format('https://www.myanimelist.net/malappinfo.php?u=%s&type=%s', username, mediaType);
    request(url, (error, response, body) => {
        if (response.statusCode == 200) {
            xmlParser(body, {explicitArray : false, ignoreAttrs : true}, (err, result) => {
                callback(null, result);      
            });
        } else {
            callback("Failure", null)
        }
    });
}

exports.addOrUpdateUser = (userInfo) => {
    let check = "SELECT * FROM user WHERE mal_id = ?";
    let vals = [userInfo.user_id];
    let checkQuery = mysql.format(check, vals);
    let success = true;

    db.get().query(checkQuery, (err, rows) => {
        if (err) {
            console.log(err);
            success = false;
        } else {
            let base = '';
            let values = [];
            let insertUpdate = '';
            if (!rows.length) {
                base = 'INSERT INTO user (mal_id, username, watching, completed, onhold, dropped, planned, days_watching) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
                values = [
                    userInfo.user_id,
                    userInfo.user_name,
                    userInfo.user_watching,
                    userInfo.user_completed,
                    userInfo.user_onhold,
                    userInfo.user_dropped,
                    userInfo.user_plantowatch,
                    userInfo.user_days_spent_watching
                ];
            } else {
                base = 'UPDATE user SET username = ?, watching = ?, completed = ?, onhold = ?, dropped = ?, planned = ?, days_watching = ? WHERE mal_id = ?';
                values = [
                    userInfo.user_name,
                    userInfo.user_watching,
                    userInfo.user_completed,
                    userInfo.user_onhold,
                    userInfo.user_dropped,
                    userInfo.user_plantowatch,
                    userInfo.user_days_spent_watching,
                    userInfo.user_id
                ];
            }
            insertUpdate = mysql.format(base, values);
            db.get().query(insertUpdate, (err) => {
                if (err) {
                    console.log(err);
                    success = false;
                }
            });
        }
    });
}