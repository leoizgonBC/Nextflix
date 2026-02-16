import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { Movie } from '../../models/movie.interface';
import { FavoritesService } from '../../services/favorites.service';
import { WatchHistoryService } from '../../services/watch-history.service';
import { RatingService } from '../../services/rating.service';
import { MovieService } from '../../services/movie.service';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-movie-modal',
  standalone: true,
  imports: [MovieCardComponent, RouterLink, DecimalPipe],
  templateUrl: './movie-modal.component.html',
  styleUrl: './movie-modal.component.scss',
})
export class MovieModalComponent {
  @Input({ required: true }) movie!: Movie;
  @Output() close = new EventEmitter<void>();
  @Output() selectMovie = new EventEmitter<Movie>();

  private sanitizer = inject(DomSanitizer);
  private favoritesService = inject(FavoritesService);
  private watchHistoryService = inject(WatchHistoryService);
  private ratingService = inject(RatingService);
  private movieService = inject(MovieService);

  showTrailer = false;
  showShareTooltip = false;

  get trailerUrl(): SafeResourceUrl | null {
    if (!this.movie.trailerUrl) return null;
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      this.movie.trailerUrl + '?autoplay=1'
    );
  }

  get isFavorite(): boolean {
    return this.favoritesService.isFavorite(this.movie.id);
  }

  get isWatched(): boolean {
    return this.watchHistoryService.isWatched(this.movie.id);
  }

  get userRating(): 'like' | 'dislike' | null {
    return this.ratingService.getRating(this.movie.id);
  }

  get relatedMovies(): Movie[] {
    return this.movieService.getRelatedMovies(this.movie);
  }

  onBackdropClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('modal-backdrop')) {
      this.close.emit();
    }
  }

  toggleFavorite() {
    this.favoritesService.toggleFavorite(this.movie.id);
  }

  toggleWatched() {
    this.watchHistoryService.toggleWatched(this.movie.id);
  }

  rate(rating: 'like' | 'dislike') {
    this.ratingService.setRating(this.movie.id, rating);
  }

  shareMovie() {
    const url = window.location.origin + '/movie/' + this.movie.id;
    navigator.clipboard.writeText(url);
    this.showShareTooltip = true;
    setTimeout(() => (this.showShareTooltip = false), 2000);
  }

  onRelatedMovieClick(movie: Movie) {
    this.selectMovie.emit(movie);
  }
}
