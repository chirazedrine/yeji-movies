from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from .routes import routes_blueprint

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.register_blueprint(routes_blueprint, url_prefix='/api')
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///../movies.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    db.init_app(app)
    CORS(app)


    return app
