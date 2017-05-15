const spawn = require('child_process').spawn;
const path = require('path');
const script = path.join(__dirname, '../scripts/anime_scraper.py');

exports.stripMediaList = (mediaType, mediaList, callback) => {
    //let stripFunc = (mediaType == 'anime' || mediaType == null) ? this.stripAnimeList : this.stripMangaList;

    // stripFunc(mediaList, (result) => {
    //     callback(result);
    // });
    this.stripAllMedia(mediaType, mediaList, (result) => {
        callback(result);
    });
}

exports.stripAllMedia = (mediaType, mediaList, callback) => {
    let isAnime = (mediaType == 'anime' || mediaType == null);

    strippedMediaList = [];
    mediaIDs = []

    allMedia = (isAnime) ? mediaList.anime : mediaList.manga;

    for (let i = 0; i < allMedia.length; i++) {
        curr = allMedia[i];
        media = {
            id : (isAnime) ? curr.series_animedb_id : curr.series_mangadb_id,
            title : curr.series_title,
            user_score : curr.my_score,
            user_status : curr.my_status,
            type : mediaType
        };
        mediaIDs.push(media.id);
        strippedMediaList.push(media);
    }

    mediaIDs.map(String);
    executePython(mediaType, mediaIDs);

    callback(strippedMediaList);
}

// exports.stripMangaList = (mangaList, callback) => {
//     strippedMangaList = [];
//     mangaIDs = [];

//     allManga = mangaList.manga;

//     for (var i = 0; i < allManga.length; i++) {
//         curr = allManga[i];
//         manga = {
//             id : curr.series_mangadb_id,
//             title : curr.series_title,
//             user_score : curr.my_score,
//             user_status : curr.my_status,
//             type : 'manga'
//         };
//         mangaIDs.push(curr.series_mangadb_id);
//         strippedMangaList.push(manga);
//     }

//     mangaIDs.map(String);
//     executePython(mangaIDs);

//     callback(strippedMangaList);
// }

// exports.stripAnimeList = (animeList, callback) => {
//     strippedAnimeList = [];
//     animeIDs = [];

//     allAnime = animeList.anime;

//     for (var i = 0; i < allAnime.length; i++) {
//         curr = allAnime[i];
//         anime = {
//             id : curr.series_animedb_id,
//             title : curr.series_title,
//             user_score : curr.my_score,
//             user_status : curr.my_status,
//             type : 'anime'
//         };
//         animeIDs.push(curr.series_animedb_id);
//         strippedAnimeList.push(anime);
//     }

//     animeIDs.map(String);
//     executePython(animeIDs);

//     callback(strippedAnimeList);
// }

executePython = (mediaType, mediaIDs) => {
    const py = spawn('python', ['-u', script, mediaType, mediaIDs]);
    let output = '';

    py.stdout.on('data', (data) => {
        output += data;
    });

    py.stderr.on('data', (data) => {
        console.log(`stderr: ${data}`);
    });

    py.on('close', (code) => {
        console.log(output);
    });
}