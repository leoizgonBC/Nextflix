import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WatchHistoryService {
  private storageKey = 'nextflix_watched';

  getWatched(): number[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  isWatched(movieId: number): boolean {
    return this.getWatched().includes(movieId);
  }

  toggleWatched(movieId: number): boolean {
    const watched = this.getWatched();
    const index = watched.indexOf(movieId);
    if (index > -1) {
      watched.splice(index, 1);
    } else {
      watched.push(movieId);
    }
    localStorage.setItem(this.storageKey, JSON.stringify(watched));
    return index === -1;
  }
}
