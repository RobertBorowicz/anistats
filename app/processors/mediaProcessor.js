exports.stripMediaList = (mediaType, mediaList, callback) => {
    let stripFunc = (mediaType == 'anime') ? this.stripAnimeList : this.stripMangaList;
    stripFunc(mediaList, (result) => {
        callback(result);
    });
}

exports.stripMangaList = (mangaList, callback) => {
    strippedMangaList = [];

    allManga = mangaList.manga;

    for (var i = 0; i < allManga.length; i++) {
        curr = allManga[i];
        manga = {
            id : curr.series_mangadb_id,
            title : curr.series_title,
            user_score : curr.my_score,
            user_status : curr.my_status,
            type : 'manga'
        };
        strippedMangaList.push(manga);
    }

    callback(strippedMangaList);
}

exports.stripAnimeList = (animeList, callback) => {
    strippedAnimeList = [];

    allAnime = animeList.anime;

    for (var i = 0; i < allAnime.length; i++) {
        curr = allAnime[i];
        anime = {
            id : curr.series_animedb_id,
            title : curr.series_title,
            user_score : curr.my_score,
            user_status : curr.my_status,
            type : 'anime'
        };
        strippedAnimeList.push(anime);
    }

    callback(strippedAnimeList);
}