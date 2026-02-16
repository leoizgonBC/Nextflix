import { Injectable } from '@angular/core';
import { UserRating } from '../models/movie.interface';

@Injectable({
  providedIn: 'root',
})
export class RatingService {
  private storageKey = 'nextflix_ratings';

  getRatings(): UserRating[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  getRating(movieId: number): 'like' | 'dislike' | null {
    const ratings = this.getRatings();
    const found = ratings.find((r) => r.movieId === movieId);
    return found ? found.rating : null;
  }

  setRating(movieId: number, rating: 'like' | 'dislike'): void {
    const ratings = this.getRatings();
    const existing = ratings.find((r) => r.movieId === movieId);
    if (existing) {
      if (existing.rating === rating) {
        // Toggle off
        const index = ratings.indexOf(existing);
        ratings.splice(index, 1);
      } else {
        existing.rating = rating;
      }
    } else {
      ratings.push({ movieId, rating });
    }
    localStorage.setItem(this.storageKey, JSON.stringify(ratings));
  }
}
