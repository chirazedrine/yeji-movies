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

interface Movie {
  id: number;
  title: string;
  release_date: string;
  rating: number;
  genre_ids: number[];
}

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

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/movies');
        setMovies(response.data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const handleGenreChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setGenre(event.target.value as string);
  };

  const handleSortChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSortBy(event.target.value as string);
  };

  const handleOrderChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setOrder(event.target.value as string);
  };

  const filterMovies = () => {
    if (!genre) return movies;
    return movies.filter((movie) => movie.genre_ids.includes(parseInt(genre)));
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
      await axios.put(`/api/bookmark/${movieId}`);
      console.log('Movie bookmarked successfully');
    } catch (error) {
      console.error('Error bookmarking movie:', error);
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
          id="genre"
          value={genre}
          onChange={handleGenreChange}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="28">Action</MenuItem>
          <MenuItem value="12">Adventure</MenuItem>
          <MenuItem value="16">Animation</MenuItem>
          <MenuItem value="35">Comedy</MenuItem>
          <MenuItem value="80">Crime</MenuItem>
          <MenuItem value="99">Documentary</MenuItem>
          <MenuItem value="18">Drama</MenuItem>
          <MenuItem value="10751">Family</MenuItem>
          <MenuItem value="14">Fantasy</MenuItem>
          <MenuItem value="36">History</MenuItem>
          <MenuItem value="27">Horror</MenuItem>
          <MenuItem value="10402">Music</MenuItem>
          <MenuItem value="9648">Mystery</MenuItem>
          <MenuItem value="10749">Romance</MenuItem>
          <MenuItem value="878">Science Fiction</MenuItem>
          <MenuItem value="10770">TV Movie</MenuItem>
          <MenuItem value="53">Thriller</MenuItem>
          <MenuItem value="10752">War</MenuItem>
          <MenuItem value="37">Western</MenuItem>
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