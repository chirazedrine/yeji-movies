import React from 'react';
import axios from 'axios';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import Button from '@material-ui/core/Button';

interface Movie {
  id: number;
  title: string;
  release_date: string;
  rating: number;
  genre_ids: number[];
}

interface MovieListProps {
  movies: Movie[];
  onBookmark: (movieId: number) => void;
}

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: '36ch',
      backgroundColor: theme.palette.background.paper,
    },
    inline: {
      display: 'inline',
    },
  })
);

const MovieList: React.FC<MovieListProps> = ({ movies, onBookmark }) => {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      {movies.map((movie) => (
        <ListItem key={movie.id} alignItems="flex-start">
          <ListItemAvatar>
            <Avatar>
              <ImageIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={movie.title}
            secondary={
              <React.Fragment>
                <span className={classes.inline}>
                  Release Date: {movie.release_date}
                </span>
                <br />
                <span className={classes.inline}>Rating: {movie.rating}</span>
                <br />
                <span className={classes.inline}>
                  Genres: {movie.genre_ids.join(', ')}
                </span>
              </React.Fragment>
            }
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => onBookmark(movie.id)}
          >
            Bookmark
          </Button>
        </ListItem>
      ))}
    </List>
  );
};

export default MovieList;