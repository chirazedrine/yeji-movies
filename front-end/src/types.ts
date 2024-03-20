export interface Movie {
  id: number;
  title: string;
  release_date: string;
  rating: number;
  genres: Genre[];
}

export interface Genre {
  id: number;
  name: string;
}