import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import MovieList from './components/MovieList';
import { Movie, Genre } from './types';

const useStyles = makeStyles((theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  })
);

const App: React.FC = () => {
  const classes = useStyles();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [genre, setGenre] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('');
  const [order, setOrder] = useState<string>('asc');
  const [loading, setLoading] = useState<boolean>(true);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [showBookmarked, setShowBookmarked] = useState<boolean>(false);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/movies');
        setMovies(response.data || []);
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };
    const fetchGenres = async () => {
      try {
        const response = await axios.get('/api/genres');
        setGenres(response.data || []);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };

    fetchMovies();
    fetchGenres();
  }, []);

  const handleGenreChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setGenre(event.target.value as string);
  };

  const handleSortChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    console.log("genre change", event.target.value)
    setSortBy(event.target.value as string);
  };

  const handleOrderChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setOrder(event.target.value as string);
  };

  const filterMovies = () => {
    if (!genre) return movies;
    console.log("Filtering for genre:", genre);
    return movies.filter((movie) =>
        movie.genres.some((g) => {
            console.log("Comparing with movie genre ID:", g.id);
            return g.id.toString() === genre;
        })
    );
};

  const sortMovies = () => {
    if (!sortBy) return filterMovies();

    const sortedMovies = [...filterMovies()].sort((a, b) => {
      if (sortBy === 'release_date') {
        return order === 'asc'
          ? new Date(a.release_date).getTime() - new Date(b.release_date).getTime()
          : new Date(b.release_date).getTime() - new Date(a.release_date).getTime();
      } else if (sortBy === 'rating') {
        return order === 'asc' ? a.rating - b.rating : b.rating - a.rating;
      }
      return 0;
    });
    return sortedMovies;
  };

  const handleBookmark = async (movieId: number) => {
    try {
      const response = await axios.post(`/api/bookmark/${movieId}`);
      if (response.data.success) {
        const updatedMovies = movies.map((movie) => {
          if (movie.id === movieId) {
            return { ...movie, bookmarked: !movie.bookmarked };
          }
          return movie;
        });
        setMovies(updatedMovies);
      }
    } catch (error) {
      console.error('Error toggling bookmark:', error);
    }
  };

  const toggleBookmarked = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/bookmarked'); 
      setMovies(response.data || []);
      setShowBookmarked(!showBookmarked);
    } catch (error) {
      console.error('Error fetching bookmarked movies:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom>
        Movies
      </Typography>

      <FormControl className={classes.formControl}>
        <InputLabel id="genre-label">Filter by Genre</InputLabel>
          <Select
            labelId="genre-label"
            id="genre-select"
            value={genre}
            onChange={handleGenreChange}
          >
            {genres.map((genre: Genre) => (
              <MenuItem key={genre.id} value={genre.id}>{genre.name}</MenuItem>
            ))}
          </Select>
      </FormControl>

      <FormControl className={classes.formControl}>
        <InputLabel id="sort-by-label">Sort By</InputLabel>
        <Select
          labelId="sort-by-label"
          id="sort-by"
          value={sortBy}
          onChange={handleSortChange}
        >
          <MenuItem value="">None</MenuItem>
          <MenuItem value="release_date">Release Date</MenuItem>
          <MenuItem value="rating">Rating</MenuItem>
        </Select>
      </FormControl>

      <FormControl className={classes.formControl}>
        <InputLabel id="order-label">Order</InputLabel>
        <Select
          labelId="order-label"
          id="order"
          value={order}
          onChange={handleOrderChange}
        >
          <MenuItem value="asc">Ascending</MenuItem>
          <MenuItem value="desc">Descending</MenuItem>
        </Select>
      </FormControl>

      <Button
        variant="contained"
        color="primary"
        disabled={loading}
        onClick={() => window.location.reload()}
      >
        {loading ? 'Loading...' : 'Refresh'}
      </Button>
      <Button onClick={toggleBookmarked}>
        {showBookmarked ? 'Show All Movies' : 'Show Bookmarked Movies'}
      </Button>

      {loading ? (
        <Typography variant="h6" component="p">
          Loading movies...
        </Typography>
      ) : (
        <MovieList movies={sortMovies()} onBookmark={handleBookmark} />
      )}
    </Container>
  );
};

export default App;