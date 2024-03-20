import requests
import os

TMDB_API_KEY = os.getenv("TMDB_API_KEY")
TMDB_BASE_URL = "https://api.themoviedb.org/3"

def fetch_movies(page=1, genre=None):
    url = f"{TMDB_BASE_URL}/discover/movie"
    params = {"api_key": TMDB_API_KEY, "page": page, "with_genres": genre}
    response = requests.get(url, params=params)
    return response.json()

def fetch_genres():
    url = f"{TMDB_BASE_URL}/genre/movie/list"
    params = {"api_key": TMDB_API_KEY}
    response = requests.get(url, params=params)
    return response.json()
