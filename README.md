# YejiMovies

This project is a full-stack web application that provides an interface to view and manage a list of movies fetched from The Movie Database (TMDb) API. It includes a backend built with Flask and a frontend created with React.

## Features

- Display a list of movies fetched from TMDb.
- Filter movies by genre.
- Sort movies by release date and rating.
- Bookmark movies and manage a list of bookmarked movies.
- View movies released in the last month sorted by rating.

## Getting Started

### Prerequisites

- Python 3.7+
- Node.js and npm
- Virtual environment for Python (recommended)

### Backend Setup

1. Navigate to the backend directory.
2. Create a virtual environment and activate it:

```
   python -m venv venv
   source venv/bin/activate  # On Windows use venv\Scripts\activate
```

3. Install the required dependencies:

```
   pip install -r requirements.txt
```

4. Set your TMDb API key in the .env file.
5. Run the Flask application:

   flask run

### Frontend Setup

1. Navigate to the frontend directory.
2. Install the necessary npm packages:

   npm install

3. Start the React development server:

   npm start

## Project Structure

- /backend: Flask application code.
  - **init**.py: Flask app initialization.
  - models.py: Database models.
  - routes.py: API route definitions.
  - tmdb.py: Helper module for TMDb API.
  - requirements.txt: Python dependencies.
  - run.py: Entry point for Flask application.
- /frontend: React application code.
  - App.tsx: Main React component.
  - MovieList.tsx: Component to display movie list.
  - index.tsx: React entry point.
  - types.ts: TypeScript type definitions.

## API Endpoints

- GET /api/movies: Fetch a list of movies.
- GET /api/genres: Fetch a list of genres.
- PUT /api/bookmark/{movieId}: Bookmark a movie.

## Scripts

- npm start: Run the frontend React application in development mode.
- flask run: Run the backend Flask server.

## Environment Variables

- TMDB_API_KEY: API key for accessing TMDb API. Set this in the backend .env file.

## Dependencies

- Backend: Flask, Flask-SQLAlchemy, Requests, python-dotenv.
- Frontend: React, Axios, Material-UI.

## License

This project is licensed under the MIT License.

## Acknowledgements

- The Movie Database (TMDb) for providing the API used to fetch movie data.
- Material-UI for the React UI framework.
