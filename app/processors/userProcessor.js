const util = require('util');
const request = require('request');
const xmlParser = require('xml2js').parseString;
const media = require('./mediaProcessor');
const userDB = require('../database/userDatabase');

const malURL = 'https://www.myanimelist.net/malappinfo.php?u=%s&type=%s&status=all';

exports.getFullUserInfo = (username, callback) => {
       let error = false;

       this.getUserMedia(username, 'anime', (err, userAnime) => {
            let fullUserInfo = {};
            if (err) error = true;
            else {
                fullUserInfo.user = userAnime.userInfo;
                fullUserInfo.anime = userAnime.media;
            }
            this.getUserMedia(username, 'manga', (err, userManga) => {
                if (err) error = true;
                else fullUserInfo.manga = userManga.media;

                callback(error, fullUserInfo);
            });
       });
}

exports.getUserMedia = (username, mediaType, callback) => {
    let url = util.format(malURL, username, mediaType);
    request(url, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            xmlParser(body, {explicitArray : false, ignoreAttrs : true}, (err, result) => {
                media.stripMediaList(mediaType, result.myanimelist, (strippedList) => {
                    userMedia = {
                        userInfo: {
                            id: result.myanimelist.myinfo.user_id,
                            name: username
                        },
                        media: strippedList
                    };
                    callback(false, userMedia);
                });
            });
        } else {
            callback(true, 'Unable to retrieve MAL profile')
        }
    });
}

// exports.getFullUserInfo = (username, mediaType, callback) => {
//     let url = util.format(malURL, username, mediaType);
//     request(url, (error, response, body) => {
//         if (!error && response.statusCode == 200) {
//             xmlParser(body, {explicitArray : false, ignoreAttrs : true}, (err, result) => {
//                 userDB.addOrUpdateUser(result.myanimelist.myinfo, mediaType);
//                 media.stripMediaList(mediaType, result.myanimelist, (strippedList) => {
//                     userList = {
//                         user_info : result.myanimelist.myinfo,
//                         list : strippedList
//                     }
//                     callback(false, userList);
//                 });
//             });
//         } else {
//             callback(true, 'Unable to retrieve the profile from MAL');
//         }
//     });
// }