from . import db

class Movie(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    release_date = db.Column(db.Date, nullable=False)
    rating = db.Column(db.Float, nullable=False)
    genre_ids = db.Column(db.String(100), nullable=False)
    bookmarked = db.Column(db.Boolean, default=False)

    def __repr__(self):
        return f'<Movie {self.title}>'

class Genre(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)

    def __repr__(self):
        return f'<Genre {self.name}>'