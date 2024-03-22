from . import db

class Genre(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)

# secondary table for many-to-many relationship between movies/genres (association table)
movies_genres = db.Table('movies_genres',
    db.Column('movie_id', db.Integer, db.ForeignKey('movie.id'), primary_key=True),
    db.Column('genre_id', db.Integer, db.ForeignKey('genre.id'), primary_key=True)
)

class Movie(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(250), nullable=False)
    release_date = db.Column(db.String(50), nullable=False)
    rating = db.Column(db.Float, nullable=False)
    genres = db.relationship('Genre', secondary=movies_genres, lazy='subquery',
                             backref=db.backref('movies', lazy=True))
    genre_ids = db.Column(db.String(250), nullable=False)
    bookmarked = db.Column(db.Boolean, default=False)
    
# class Movie(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     title = db.Column(db.String(250), nullable=False)
#     release_date = db.Column(db.String(50), nullable=False)
#     rating = db.Column(db.Float, nullable=False)
#     genre_ids = db.Column(db.String(250), nullable=False)
#     bookmarked = db.Column(db.Boolean, default=False)
