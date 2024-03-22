from .tmdb import fetch_movies, fetch_genres
from .models import Genre, Movie, db, movies_genres

def populate_genres():
    if Genre.query.count() == 0:
        genres = fetch_genres()['genres']
        for genre in genres:
            new_genre = Genre(id=genre['id'], name=genre['name'])
            db.session.add(new_genre)
        db.session.commit()

def populate_movies():
    if Movie.query.count() == 0:
        page = 1
        while True:
            response = fetch_movies(page=page)
            movies = response['results']
            if not movies:
                break
            for movie_data in movies:
                movie = Movie(
                    id=movie_data['id'],
                    title=movie_data['title'],
                    release_date=movie_data['release_date'],
                    rating=movie_data['vote_average'],
                    bookmarked=False
                )
                for genre_id in movie_data['genre_ids']:
                    genre = Genre.query.get(genre_id)
                    if genre:
                        movie.genres.append(genre)
                db.session.add(movie)
            db.session.commit()
            page += 1