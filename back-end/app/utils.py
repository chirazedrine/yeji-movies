import requests, os
from datetime import datetime

API_KEY = os.getenv('TMDB_API_KEY')
BASE_URL = 'https://api.themoviedb.org/3'

def fetch_movies():
    url = f"{BASE_URL}/discover/movie?api_key={API_KEY}&sort_by=popularity.desc"
    response = requests.get(url)
    movies = response.json()['results']
    return [{
        'id': movie['id'],
        'title': movie['title'],
        'release_date': datetime.strptime(movie['release_date'], '%Y-%m-%d').date(),
        'rating': movie['vote_average'],
        'genre_ids': movie['genre_ids']
    } for movie in movies]

def fetch_genres():
    url = f"{BASE_URL}/genre/movie/list?api_key={API_KEY}"
    response = requests.get(url)
    genres = response.json()['genres']
    return [{'id': genre['id'], 'name': genre['name']} for genre in genres]
