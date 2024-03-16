# YejiMovies Back-End Documentation

Welcome to the YejiMovies back-end repository. This document provides all the necessary information to get the back-end server up and running, understand its structure, and how it interacts with external services like The Movie Database (TMDb) API.

## Overview

YejiMovies is designed to fetch, store, and manage movie data from TMDb. It allows users to view movies, filter them by genres, and bookmark their favorites. The back-end is built with Flask and Flask-SQLAlchemy, offering a RESTful API for the front-end.

## Getting started

### Prerequisites

- Python 3.7+
- pip
- virtualenv

### Setup and installation

1. **Clone the repository**:

```
   git clone <repository-url>
   cd yejiMovies/back-end
```

2. **Create and activate a virtual environment**:

```
   python3 -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
```

3. **Install dependencies**:

```
   pip install -r requirements.txt
```

4. **Set up environment variables**:

   Create a `.env` file in the back-end directory and add the following line:

```
   TMDB_API_KEY=your_api_key_here
```

Replace `your_api_key_here` with your actual TMDb API key.

5. **Initialize the database**:

```
   flask db upgrade
```

6. **Run the server**:

```
   flask run
```

## API endpoints

- GET /movies: Retrieves a list of movies.
- GET /movies/<genre>: Filters movies by genre.
- POST /bookmarks: Adds a movie to bookmarks.
- GET /bookmarks: Retrieves bookmarked movies.
- DELETE /bookmarks/<id>: Removes a movie from bookmarks.

## Models

- **Movie**: Represents movie data with fields for id, title, release date, and rating.
- **Genre**: Represents movie genres.
- **Bookmark**: Links users with bookmarked movies.

## External APIs

YejiMovies uses The Movie Database (TMDb) API to fetch movie and genre information.
