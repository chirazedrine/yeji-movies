from flask import Blueprint, request, jsonify
from .models import Movie, Genre, db
from .tmdb import fetch_movies, fetch_genres
from datetime import datetime, timedelta
from sqlalchemy import desc

main = Blueprint('main', __name__)

@main.route('/api/movies', methods=['GET'])
def get_movies():
    genre_name = request.args.get('genre')
    sort_by = request.args.get('sort', 'rating')
    order = request.args.get('order', 'desc')

    query = Movie.query.join(Movie.genres)
    
    if genre_name:
        query = query.filter(Genre.name == genre_name)
    
    if sort_by:
        if order == 'asc':
            query = query.order_by(sort_by)
        else:  # Default to 'desc'
            query = query.order_by(desc(sort_by))
    
    movies = query.all()
    return jsonify([{
        'id': movie.id,
        'title': movie.title,
        'release_date': movie.release_date,
        'rating': movie.rating,
        'genres': [genre.name for genre in movie.genres],
        'bookmarked': movie.bookmarked
    } for movie in movies]), 200

@main.route('/api/recent-movies')
def get_recent_movies():
    last_month = datetime.now() - timedelta(days=30)
    movies = Movie.query.filter(Movie.release_date >= last_month.date()).order_by(Movie.rating.desc()).all()

    return jsonify([{
        'id': movie.id,
        'title': movie.title,
        'release_date': movie.release_date,
        'rating': movie.rating,
        'genres': [genre.name for genre in movie.genres],
        'genre_ids': [genre.id for genre in movie.genres],
        'bookmarked': movie.bookmarked
    } for movie in movies])

@main.route('/api/genres', methods=['GET'])
def get_genres():
    genres = Genre.query.all()
    return jsonify([{'id': genre.id, 'name': genre.name} for genre in genres]), 200

@main.route('/bookmark/<int:movie_id>', methods=['POST'])
def toggle_bookmark(movie_id):
    movie = Movie.query.get(movie_id)
    if movie:
        movie.bookmarked = not movie.bookmarked
        db.session.commit()
        return jsonify({"success": True, "bookmarked": movie.bookmarked}), 200
    return jsonify({"error": "Movie not found"}), 404

@main.route('/bookmarked', methods=['GET'])
def get_bookmarked_movies():
    bookmarked_movies = Movie.query.filter_by(bookmarked=True).all()
    return jsonify([{"id": movie.id, 
                     "title": movie.title, 
                     "release_date": movie.release_date, 
                     "rating": movie.rating, 
                     "genre_ids": movie.genre_ids, 
                     "bookmarked": movie.bookmarked} 
                     for movie in bookmarked_movies]), 200