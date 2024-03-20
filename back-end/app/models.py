from . import db

class Movie(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(250), nullable=False)
    release_date = db.Column(db.String(50), nullable=False)
    rating = db.Column(db.Float, nullable=False)
    genre_ids = db.Column(db.String(250), nullable=False)
    bookmarked = db.Column(db.Boolean, default=False)
