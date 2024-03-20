from .models import Movie, Genre

def filter_movies_by_genre(genre_name):
    genre = Genre.query.filter_by(name=genre_name).first()
    if not genre:
        return []

    genre_id = genre.id
    movies = Movie.query.filter(Movie.genre_ids.contains(str(genre_id))).all()
    return movies

def sort_movies_by_feature(feature, order='asc'):
    if feature == 'release_date':
        if order == 'asc':
            movies = Movie.query.order_by(Movie.release_date).all()
        else:
            movies = Movie.query.order_by(Movie.release_date.desc()).all()
    elif feature == 'rating':
        if order == 'asc':
            movies = Movie.query.order_by(Movie.rating).all()
        else:
            movies = Movie.query.order_by(Movie.rating.desc()).all()
    else:
        movies = Movie.query.all()

    return movies

from datetime import datetime, timedelta

def get_movies_released_last_month():
    today = datetime.now().date()
    last_month = today - timedelta(days=30)
    movies = Movie.query.filter(Movie.release_date >= last_month).order_by(Movie.rating.desc()).all()
    return movies