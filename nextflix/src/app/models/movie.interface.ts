export interface Movie {
  id: number;
  title: string;
  synopsis: string;
  imageUrl: string;
  year: number;
  rating: number;
  genre: string;
  trailerUrl?: string;
  trending?: boolean;
  views?: number;
}

export interface UserProfile {
  name: string;
  avatar: string;
}

export interface UserRating {
  movieId: number;
  rating: 'like' | 'dislike';
}
