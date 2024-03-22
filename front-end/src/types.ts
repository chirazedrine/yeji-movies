export interface Movie {
  bookmarked: boolean;
  id: number;
  title: string;
  release_date: string;
  rating: number;
  genres: Genre[];
  genre_ids: number[];
}

export interface Genre {
  id: number;
  name: string;
}