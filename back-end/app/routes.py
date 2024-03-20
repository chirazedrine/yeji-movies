from flask import Blueprint, jsonify, request
import requests
import os

# Blueprint setup
routes_blueprint = Blueprint('routes', __name__)

TMDB_API_KEY = os.getenv("TMDB_API_KEY")
BASE_URL = "https://api.themoviedb.org/3"

@routes_blueprint.route("/movies", methods=["GET"])
def get_movies():
    params = {
        "api_key": TMDB_API_KEY,
        "language": "en-US",
        "sort_by": "popularity.desc",
        "page": request.args.get("page", 1)
    }
    genre = request.args.get("genre")
    if genre:
        params["with_genres"] = genre
    
    response = requests.get(f"{BASE_URL}/discover/movie", params=params)
    return jsonify(response.json()), response.status_code

@routes_blueprint.route("/genres", methods=["GET"])
def get_genres():
    response = requests.get(f"{BASE_URL}/genre/movie/list", params={"api_key": TMDB_API_KEY, "language": "en-US"})
    return jsonify(response.json()), response.status_code

@routes_blueprint.route("/movie/<int:movie_id>", methods=["GET"])
def get_movie_details(movie_id):
    response = requests.get(f"{BASE_URL}/movie/{movie_id}", params={"api_key": TMDB_API_KEY, "language": "en-US"})
    return jsonify(response.json()), response.status_code

@routes_blueprint.route("/movie/<int:movie_id>/credits", methods=["GET"])
def get_movie_credits(movie_id):
    response = requests.get(f"{BASE_URL}/movie/{movie_id}/credits", params={"api_key": TMDB_API_KEY, "language": "en-US"})
    return jsonify(response.json()), response.status_code

@routes_blueprint.route("/search/movie", methods=["GET"])
def search_movies():
    query = request.args.get("query")
    response = requests.get(f"{BASE_URL}/search/movie", params={"api_key": TMDB_API_KEY, "language": "en-US", "query": query})
    return jsonify(response.json()), response.status_code
