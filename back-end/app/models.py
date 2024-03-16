from . import db

class Movie(db.Model):
    __tablename__ = 'movies'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    release_date = db.Column(db.Date, nullable=False)
    rating = db.Column(db.Float, nullable=False)
    genres = db.relationship('Genre', secondary='movie_genres', back_populates='movies')

class Genre(db.Model):
    __tablename__ = 'genres'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    movies = db.relationship('Movie', secondary='movie_genres', back_populates='genres')

class Bookmark(db.Model):
    __tablename__ = 'bookmarks'
    id = db.Column(db.Integer, primary_key=True)
    movie_id = db.Column(db.Integer, db.ForeignKey('movies.id'), nullable=False)
    movie = db.relationship('Movie', backref='bookmarks')

movie_genres = db.Table('movie_genres',
    db.Column('movie_id', db.Integer, db.ForeignKey('movies.id'), primary_key=True),
    db.Column('genre_id', db.Integer, db.ForeignKey('genres.id'), primary_key=True)
)
