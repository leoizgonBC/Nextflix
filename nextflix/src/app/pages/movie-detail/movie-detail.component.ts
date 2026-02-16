import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MovieService } from '../../services/movie.service';
import { FavoritesService } from '../../services/favorites.service';
import { WatchHistoryService } from '../../services/watch-history.service';
import { RatingService } from '../../services/rating.service';
import { Movie } from '../../models/movie.interface';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { MovieModalComponent } from '../../components/movie-modal/movie-modal.component';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [MovieCardComponent, MovieModalComponent, RouterLink, DecimalPipe],
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.scss',
})
export class MovieDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private sanitizer = inject(DomSanitizer);
  private movieService = inject(MovieService);
  private favoritesService = inject(FavoritesService);
  private watchHistoryService = inject(WatchHistoryService);
  private ratingService = inject(RatingService);

  movie: Movie | null = null;
  selectedModal: Movie | null = null;
  showTrailer = false;
  showShareTooltip = false;

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const id = Number(params['id']);
      this.movie = this.movieService.getMovieById(id) || null;
      if (!this.movie) {
        this.router.navigate(['/404']);
      }
    });
  }

  get trailerUrl(): SafeResourceUrl | null {
    if (!this.movie?.trailerUrl) return null;
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      this.movie.trailerUrl + '?autoplay=1'
    );
  }

  get isFavorite(): boolean {
    return this.movie ? this.favoritesService.isFavorite(this.movie.id) : false;
  }

  get isWatched(): boolean {
    return this.movie ? this.watchHistoryService.isWatched(this.movie.id) : false;
  }

  get userRating(): 'like' | 'dislike' | null {
    return this.movie ? this.ratingService.getRating(this.movie.id) : null;
  }

  get relatedMovies(): Movie[] {
    return this.movie ? this.movieService.getRelatedMovies(this.movie) : [];
  }

  toggleFavorite() {
    if (this.movie) this.favoritesService.toggleFavorite(this.movie.id);
  }

  toggleWatched() {
    if (this.movie) this.watchHistoryService.toggleWatched(this.movie.id);
  }

  rate(rating: 'like' | 'dislike') {
    if (this.movie) this.ratingService.setRating(this.movie.id, rating);
  }

  shareMovie() {
    navigator.clipboard.writeText(window.location.href);
    this.showShareTooltip = true;
    setTimeout(() => (this.showShareTooltip = false), 2000);
  }

  openModal(movie: Movie) {
    this.selectedModal = movie;
  }

  closeModal() {
    this.selectedModal = null;
  }

  navigateToMovie(movie: Movie) {
    this.router.navigate(['/movie', movie.id]);
    this.selectedModal = null;
  }
}
