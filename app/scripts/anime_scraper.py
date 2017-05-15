import sys
import requests
from bs4 import BeautifulSoup
import re
import time
from media_database import MALMediaDatabase

# cnx = mysql.connector.connect(**config)

# query = 'SELECT * FROM users'

# curA = cnx.cursor(buffered=True)
# curA.execute(query)

# for (user, name) in curA:
#     print user
#     print name

'''
Currently not doing any error handling
Will fix before implementing into malstats

Also decided to merge everything into a single scraper
This makes the file much longer, but there are redundant pieces of 
code between the manga and anime scrapers. I pass the media type and 
full list of IDs from NodeJS, so I can handle everything regarding which 
tables and scraper functions to use
'''
class MALMediaScraper():

    def __init__(self, mediaType, allIDs):
        # soup is the backbone for all class methods
        # this should be an instance of BeautifulSoup()
        self.soup = None
        self.ids = allIDs
        self.media = mediaType
        self.url = 'https://myanimelist.net/%s/' % mediaType
        self.database = MALMediaDatabase()
        # self.update_soup()

        self.animeDescriptor = {
            'Type'      : self.get_type,
            'Title'     : self.get_title,
            'Title_JP'  : self.get_title_jp,
            'Title_EN'  : self.get_title_en,
            'Episodes'  : self.get_episodes,
            'Status'    : self.get_status,
            'Premier'   : self.get_premier,
            'Producers' : self.get_producers,
            'Studios'   : self.get_studios,
            'Source'    : self.get_source,
            'Genres'    : self.get_genres,
            'Duration'  : self.get_duration_minutes,
            'Rating'    : self.get_rating,
            'Score'     : self.get_score_as_float,
            'Members'   : self.get_members,
            'Favorites' : self.get_favorites
        }

        self.mangaDescriptor = {
            'Type'        : self.get_type,
            'Title'       : self.get_title,
            'Title_JP'    : self.get_title_jp,
            'Title_EN'    : self.get_title_en,
            'Chapters'    : self.get_chapters,
            'Status'      : self.get_status,
            'Volumes'     : self.get_volumes,
            'Authors'     : self.get_authors,
            'Serial'      : self.get_serialization,
            'Genres'      : self.get_genres,
            'Score'       : self.get_score_as_float,
            'Members'     : self.get_members,
            'Favorites'   : self.get_favorites,
            'Relations'   : self.get_all_relations
        }

    def update_soup(self, newID):
        res = requests.get(self.url + str(newID))
        if not res.ok:
            print 'Error getting the requested anime'
            return
        self.soup = BeautifulSoup(res.content, 'html.parser')

    def set_animeID_and_update(self, animeID):
        self.id = animeID
        self.url = 'https://myanimelist.net/anime/' + animeID
        self.update_soup()

    def scrape_media(self):
        descriptor = self.animeDescriptor if self.media == 'anime' else self.mangaDescriptor

        print self.ids

        for i in self.ids:
            # Check if the record exists in the database before scraping
            # if not self.database.exists(self.media, i)

            # self.update_soup(i)

            # for key, function in descriptor.items():
            #     descriptor[key] = function()

            # descriptor['Timestamp'] = time.ctime()
            # descriptor['ID'] = self.id
            # yield descriptor
            print i
            sys.stdout.flush()
            time.sleep(.01)

        return None

    def get_type(self):
        tag = self.soup.find('span', string='Type:')
        media_type = None
        if tag:
            media_type = tag.find_next_sibling('a').string
        return media_type

    def get_title(self):
        tag = self.soup.find('span', itemprop='name')
        title = None
        if tag:
            title = tag.string.strip()
        return title

    def get_title_jp(self):
        tag = self.soup.find('span', string='Japanese:')
        title = None
        if tag:
            title = tag.next_sibling.encode('utf8')
            title = title.strip()
            return title
        return title

    def get_title_en(self):
        tag = self.soup.find('span', string='English:')
        title = None
        if tag:
            title = tag.next_sibling.encode('utf8')
            title = title.strip()
            return title
        return title

    def get_episodes(self):
        tag = self.soup.find('span', string='Episodes:')
        if tag:
            episodes = tag.next_sibling.encode('utf8')
            try:
                episodes = int(episodes.strip())
                return episodes
            except:
                print "Unable to correctly parse episodes"
        return 0

    def get_chapters(self):
        tag = self.soup.find('span', string='Chapters:')
        if tag:
            chaps = tag.next_sibling.encode('utf8')
            try:
                chaps = int(chaps.strip())
                return chaps
            except:
                print "Unable to correctly parse chapters"
        return 0

    def get_status(self):
        tag = self.soup.find('span', string='Status:')
        status = None
        if tag:
            status = tag.next_sibling.encode('utf8')
            status = status.strip()
            return status
        return status

    def get_premier(self):
        tag = self.soup.find('span', string='Premiered:')
        prem = None
        if tag:
            next_tag = tag.find_next_sibling('a')
            date, season = next_tag.string.strip().split(' ')
            prem = (date, season)
        return prem

    def get_volumes(self):
        tag = self.soup.find('span', string='Volumes:')
        if tag:
            vols = tag.next_sibling.encode('utf8')
            try:
                vols = int(vols.strip())
                return vols
            except:
                print "Unable to correctly parse volumes"
        return 0

    def get_authors(self):
        mainTag = self.soup.find('span', string='Authors:')
        siblingTags = mainTag.find_next_siblings('a')
        authors = []
        pattern = re.compile('/people/([0-9]+)')
        if not siblingTags:
            print 'Failure retrieving authors'
        else:
            for sib in siblingTags:
                m = re.match(pattern, sib['href'])
                auth_id = 0
                try:
                    auth_id = int(m.group(1))
                except:
                    pass
                authors.append((auth_id, sib.string))

        return authors

    def get_serialization(self):
        mainTag = self.soup.find('span', string='Serialization:')
        siblingTags = mainTag.find_next_siblings('a')
        serial = []
        pattern = re.compile('/manga/magazine/([0-9]+)')
        if not siblingTags:
            print 'Failure retrieving genres'
        else:
            for sib in siblingTags:
                m = re.match(pattern, sib['href'])
                ser_id = 0
                try:
                    ser_id = int(m.group(1))
                except:
                    pass
                serial.append((ser_id, sib.string))

        return serial

    def get_producers(self):
        mainTag = self.soup.find('span', string='Producers:')
        siblingTags = mainTag.find_next_siblings('a')
        producers = []
        pattern = re.compile('/anime/producer/([0-9]+)')
        if not siblingTags:
            print 'Failure retrieving producers'
        else:
            for sib in siblingTags:
                m = re.match(pattern, sib['href'])
                prod_id = 0
                try:
                    prod_id = int(m.group(1))
                except:
                    pass
                producers.append((prod_id, sib.string))

        return producers

    def get_studios(self):
        mainTag = self.soup.find('span', string='Studios:')
        siblingTags = mainTag.find_next_siblings('a')
        studios = []
        pattern = re.compile('/anime/producer/([0-9]+)')
        if not siblingTags:
            print 'Failure retrieving studios'
        else:
            for sib in siblingTags:
                m = re.match(pattern, sib['href'])
                stud_id = 0
                try:
                    stud_id = int(m.group(1))
                except:
                    pass
                studios.append((stud_id, sib.string))

        return studios

    def get_source(self):
        tag = self.soup.find('span', string='Source:')
        source = None
        if tag:
            source = tag.next_sibling.encode('utf8')
            source = source.strip()
        return source

    def get_genres(self):
        tags = self.soup(href=re.compile('genre'))
        genres = []
        pattern = re.compile('/%s/genre/([0-9]+)' % self.media)
        if not tags:
            print 'Failure retrieving genres'
        else:
            for tag in tags:
                m = re.match(pattern, tag['href'])
                genre_id = 0
                try:
                    genre_id = int(m.group(1))
                except:
                    pass
                genres.append((genre_id, tag.string))
        return genres

    def get_duration_minutes(self):
        tag = self.soup.find('span', string='Duration:')
        duration = -1
        dur_text = None
        if tag:
            dur_text = tag.next_sibling.encode('utf8')
            dur_text = dur_text.strip()
            if dur_text != 'Unknown':
               duration = self.__parse_duration(dur_text)
        return duration

    def get_rating(self):
        tag = self.soup.find('span', string='Rating:')
        rating = None
        if tag:
            rating = tag.next_sibling.encode('utf8')
            rating = rating.strip()
        return rating

    def get_score_as_float(self):
        tag = self.soup.find('span', itemprop='ratingValue')
        score = 0.0
        if tag:
            raw_score = tag.string
            score = float('{0:2s}'.format(raw_score))
        return score

    def get_members(self):
        tag = self.soup.find('span', string='Members:')
        members = 0
        if tag:
            members = tag.next_sibling.replace(',','')
            try:
                members = int(members)
            except:
                pass
        return members

    def get_favorites(self):
        tag = self.soup.find('span', string='Favorites:')
        favs = 0
        if tag:
            fav = tag.next_sibling.replace(',','')
            try:
                favs = int(fav)
            except:
                pass
        return favs

    def get_all_relations(self):
        table = self.soup.find('table', {'class':'anime_detail_related_anime'})
        data = table.find_all('td')
        relations = {}
        animePattern = re.compile('/anime/([0-9]+)')
        mangaPattern = re.compile('/manga/([0-9]+)')
        currKey = ''
        for d in data:
            try:
                if d.string and d.string in self.relatedStrings:
                    currKey = d.string.replace(':', '')
                    relations[currKey] = []
                else:
                    if currKey == "Adaptation":
                        p = animePattern
                    else:
                        p = mangaPattern
                    for link in d.find_all('a'):
                        m = re.match(p, link['href'])
                        relatedID = int(m.group(1))
                        relations[currKey].append(relatedID)

            except:
                print 'Error'
                pass
            # print d.find_all('a')
        return relations

    def __parse_duration(self, text):
        pattern = re.compile('([\d]+)\D+(?:(\d+))?')
        m = re.match(pattern, text)

        total = 0
        all_groups = m.groups()
        if len(all_groups) != 2:
            return 0
        else:
            if not all_groups[1]:
                total = int(all_groups[0])
            else:
                total = int(all_groups[0])*60 + int(all_groups[1])

        return total

    def check(self):
        curr_time = int(time.time())
        exists, timestamp = self.database.exists('anime', 22729)
        time_since = (curr_time - timestamp) / 86400.0
        if (not exists or time_since > 14):
            print "Need to add"
        else:
            print "All good"

def main(args):
    # anime = MALAnimeScraper(args[1])
    # anime_data = anime.scrape_anime()
    scraper = MALMediaScraper('anime', [1,2,3])
    scraper.check()
    # db.insert_record(anime_data)
    # mediaType = args[1]
    # allIDs = [int(x) for x in args[2].split(',')]

    # print mediaType
    
    # scraper = MALMediaScraper(mediaType, allIDs)
    # scraper.scrape_media()

    # print allIDs

if __name__ == '__main__':
    main(sys.argv)