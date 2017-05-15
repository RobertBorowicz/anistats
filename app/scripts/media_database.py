import mysql.connector
from dbconfig import config

class MALMediaDatabase():

    def __init__(self):
        self.cnx = mysql.connector.connect(**config)
        self.validKeys = [
            'ID',
            'Type',
            'Title',
            'Title_JP',
            'Title_EN',
            'Episodes',
            'Status',
            'Premier',
            'Producers',
            'Studios',
            'Source',
            'Genres',
            'Duration',
            'Rating',
            'Score',
            'Members',
            'Favorites',
            'Timestamp'
        ]

    def exists(self, mediaType, mediaID):
        cursor = self.cnx.cursor(prepared=True)

        anime_stmt = 'SELECT anime_id, unix_timestamp(date_added) FROM anime WHERE anime_id=%s'
        manga_stmt = 'SELECT manga_id, unix_timestamp(date_added) FROM manga WHERE manga_id=%s'

        stmt = anime_stmt if mediaType == 'anime' else manga_stmt

        try:
            cursor.execute(stmt, (mediaID,))
            rows = cursor.fetchone()
            print rows
            if rows:
                return True, rows[1]
            else:
                return False, None
        except:
            print "Database Error"
            return False


    def insert_record(self, d):
        cursor = self.cnx.cursor(prepared=True)

        insert_anime_stmt = ('INSERT INTO anime ('
                'anime_id, title, title_jp, title_en, status, type, premier_season, '
                'premier_year, episodes, duration, score, rating, members, favorites) '
                'VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)')

        data = (d['ID'], d['Title'], d['Title_JP'], d['Title_EN'],
                d['Status'], d['Type'], d['Premier'][0], d['Premier'][1],
                d['Episodes'], d['Duration'], d['Score'], d['Rating'],
                d['Members'], d['Favorites'])

        print d["Timestamp"]

        try:
            cursor.execute(insert_anime_stmt, data)
        except:
            print "Error %s" % d['ID']
            pass

        #anime_genre_bridge = ('')

        self.cnx.commit()