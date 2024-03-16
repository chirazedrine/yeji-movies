from flask import jsonify
from . import app, db
from .models import Movie, Genre, Bookmark
from .utils import fetch_movies, fetch_genres

@app.route('/init_db', methods=['GET'])
def init_db():
    # Fetch and insert genres
    for genre in fetch_genres():
        if not Genre.query.get(genre['id']):
            db.session.add(Genre(id=genre['id'], name=genre['name']))
    db.session.commit()

    # Fetch and insert movies
    for movie in fetch_movies():
        if not Movie.query.get(movie['id']):
            new_movie = Movie(id=movie['id'], title=movie['title'],
                              release_date=movie['release_date'], rating=movie['rating'])
            for genre_id in movie['genre_ids']:
                genre = Genre.query.get(genre_id)
                if genre:
                    new_movie.genres.append(genre)
            db.session.add(new_movie)
    db.session.commit()

    return jsonify({'message': 'Database initialized.'})

