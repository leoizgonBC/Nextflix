import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private storageKey = 'nextflix_favorites';

  getFavorites(): number[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  isFavorite(movieId: number): boolean {
    return this.getFavorites().includes(movieId);
  }

  toggleFavorite(movieId: number): boolean {
    const favorites = this.getFavorites();
    const index = favorites.indexOf(movieId);
    if (index > -1) {
      favorites.splice(index, 1);
    } else {
      favorites.push(movieId);
    }
    localStorage.setItem(this.storageKey, JSON.stringify(favorites));
    return index === -1; // returns true if added
  }
}
