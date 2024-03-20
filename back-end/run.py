from app import create_app, db
from app.models import Movie, Genre
import requests
import os
from dotenv import load_dotenv

load_dotenv()

TMDB_API_KEY = os.getenv('TMDB_API_KEY')

app = create_app()
with app.app_context():
    db.create_all()

def fetch_movies():
    url = 'https://api.themoviedb.org/3/discover/movie'
    params = {
        'api_key': TMDB_API_KEY,
        'sort_by': 'popularity.desc',
        'include_adult': False,
        'include_video': False,
        'page': 1
    }
    response = requests.get(url, params=params)
    data = response.json()
    movies = data['results']
    print(f"Fetched {len(movies)} movies from the API")

    for movie in movies:
        title = movie['title']
        release_date = movie['release_date']
        rating = movie['vote_average']
        genre_ids = ','.join(str(genre['id']) for genre in movie['genre_ids'])

        movie_obj = Movie(title=title, release_date=release_date, rating=rating, genre_ids=genre_ids)
        db.session.add(movie_obj)

    db.session.commit()

def fetch_genres():
    url = 'https://api.themoviedb.org/3/genre/movie/list'
    params = {
        'api_key': TMDB_API_KEY,
        'language': 'en-US'
    }
    response = requests.get(url, params=params)
    data = response.json()
    genres = data['genres']

    for genre in genres:
        genre_obj = Genre(id=genre['id'], name=genre['name'])
        db.session.add(genre_obj)

    db.session.commit()

@app.before_first_request
def create_tables():
    db.create_all()
    fetch_movies()
    fetch_genres()

if __name__ == '__main__':
    app.run(debug=True)