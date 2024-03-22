import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Grid,
  makeStyles,
  Theme,
} from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import { Movie } from '../types';

interface MovieListProps {
  movies: Movie[];
  onBookmark: (movieId: number) => void;
}
const useStyles = makeStyles((theme: Theme) => ({
  card: {
    marginBottom: theme.spacing(2),
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  rating: {
    display: 'flex',
    alignItems: 'center',
  },
  genreList: {
    marginTop: theme.spacing(1),
  },
}));

const MovieList: React.FC<MovieListProps> = ({ movies, onBookmark }) => {
  const classes = useStyles();

  return (
    <Grid container spacing={3}>
      {movies.map((movie) => (
        <Grid item xs={12} sm={6} md={4} key={movie.id}>
          <Card className={classes.card}>
            <CardContent>
              <Typography className={classes.title} color="textPrimary" gutterBottom>
                {movie.title}
              </Typography>
              <Typography color="textSecondary">
                Release Date: {movie.release_date}
              </Typography>
              <div className={classes.rating}>
                <Rating value={movie.rating / 2} readOnly />
                <Typography>({movie.rating})</Typography>
              </div>
              <Typography className={classes.genreList}>
              Genres: {movie.genres && movie.genres.length > 0 ? movie.genres.join(', ') : 'N/A'}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                color="primary"
                startIcon={movie.bookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                onClick={() => onBookmark(movie.id)}
              >
                Bookmark
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default MovieList;