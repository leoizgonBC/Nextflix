import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { Movie } from '../../models/movie.interface';
import { FavoritesService } from '../../services/favorites.service';
import { WatchHistoryService } from '../../services/watch-history.service';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss',
})
export class MovieCardComponent {
  @Input({ required: true }) movie!: Movie;
  @Output() selectMovie = new EventEmitter<Movie>();

  private favoritesService = inject(FavoritesService);
  private watchHistoryService = inject(WatchHistoryService);

  showConfetti = false;

  get isFavorite(): boolean {
    return this.favoritesService.isFavorite(this.movie.id);
  }

  get isWatched(): boolean {
    return this.watchHistoryService.isWatched(this.movie.id);
  }

  toggleFavorite(event: Event) {
    event.stopPropagation();
    const added = this.favoritesService.toggleFavorite(this.movie.id);
    if (added) {
      this.showConfetti = true;
      setTimeout(() => (this.showConfetti = false), 1000);
    }
  }

  toggleWatched(event: Event) {
    event.stopPropagation();
    this.watchHistoryService.toggleWatched(this.movie.id);
  }
}
