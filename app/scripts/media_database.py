import mysql.connector
from dbconfig import config

class MALMediaDatabase():

    def __init__(self):
        self.cnx = mysql.connector.connect(**config)
        # self.validKeys = [
        #     'ID',
        #     'Type',
        #     'Title',
        #     'Title_JP',
        #     'Title_EN',
        #     'Episodes',
        #     'Status',
        #     'Premier',
        #     'Producers',
        #     'Studios',
        #     'Source',
        #     'Genres',
        #     'Duration',
        #     'Rating',
        #     'Score',
        #     'Members',
        #     'Favorites',
        #     'Timestamp'
        # ]

        self.anime_insert_stmt = ('INSERT INTO media ('
                'mal_id, media_type, title, title_jp, title_en, status, type, '
                'premier_season, episodes, duration, score, rating, members, favorites) '
                'VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)')

        self.manga_insert_stmt = ('INSERT INTO media ('
                'mal_id, media_type, title, title_jp, title_en, status, chapters, '
                'volumes, serialization, score, members, favorites) '
                'VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)')

    def exists(self, mediaType, mediaID):
        cursor = self.cnx.cursor(prepared=True)

        stmt = 'SELECT mal_id, unix_timestamp(date_added) FROM media WHERE mal_id=%s AND media_type=%s'

        try:
            cursor.execute(stmt, (mediaID, mediaType,))
            rows = cursor.fetchone()
            print rows
            if rows:
                return True, rows[1]
            else:
                return False, None
        except:
            print "Database Error"
            return False


    def insert_record(self, d, isAnime):
        cursor = self.cnx.cursor(prepared=True)

        stmt = self.anime_insert_stmt if isAnime else self.manga_insert_stmt

        data = None

        if (isAnime):
            data = (d['ID'], 'anime', d['Title'], d['Title_JP'], d['Title_EN'],
                d['Status'], d['Type'], d['Premier'],
                d['Episodes'], d['Duration'], d['Score'], d['Rating'],
                d['Members'], d['Favorites'])
        else:
            data = (d['ID'], 'manga', d['Title'], d['Title_JP'], d['Title_EN'],
                d['Status'], d['Chapters'], d['Volumes'],
                d['Serial'], d['Score'],
                d['Members'], d['Favorites'])

        try:
            cursor.execute(stmt, data)
        except:
            print "Error %s" % d['ID']
            pass

        #anime_genre_bridge = ('')

        self.cnx.commit()