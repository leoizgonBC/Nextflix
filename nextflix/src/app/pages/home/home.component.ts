import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../models/movie.interface';
import { HeroCarouselComponent } from '../../components/hero-carousel/hero-carousel.component';
import { MovieRowComponent } from '../../components/movie-row/movie-row.component';
import { MovieModalComponent } from '../../components/movie-modal/movie-modal.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroCarouselComponent, MovieRowComponent, MovieModalComponent, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private movieService = inject(MovieService);
  private route = inject(ActivatedRoute);

  genres = this.movieService.getGenres();
  trendingMovies = this.movieService.getTrendingMovies();
  selectedMovie: Movie | null = null;
  searchQuery = '';
  activeGenre: string | null = null;
  sortBy: 'default' | 'rating' | 'year' | 'title' = 'default';
  loading = true;

  ngOnInit() {
    // Simulate loading for skeleton effect
    setTimeout(() => (this.loading = false), 800);

    this.route.queryParams.subscribe((params) => {
      this.searchQuery = params['q'] || '';
    });
  }

  get filteredGenres(): string[] {
    if (this.searchQuery) {
      return this.genres.filter(
        (genre) => this.getFilteredMoviesByGenre(genre).length > 0
      );
    }
    if (this.activeGenre) {
      return [this.activeGenre];
    }
    return this.genres;
  }

  getFilteredMoviesByGenre(genre: string): Movie[] {
    let movies = this.movieService.getMoviesByGenre(genre);
    if (this.searchQuery) {
      const query = this.searchQuery.toLowerCase();
      movies = movies.filter(
        (m) =>
          m.title.toLowerCase().includes(query) ||
          m.genre.toLowerCase().includes(query) ||
          m.synopsis.toLowerCase().includes(query)
      );
    }
    return this.sortMovies(movies);
  }

  sortMovies(movies: Movie[]): Movie[] {
    switch (this.sortBy) {
      case 'rating':
        return [...movies].sort((a, b) => b.rating - a.rating);
      case 'year':
        return [...movies].sort((a, b) => b.year - a.year);
      case 'title':
        return [...movies].sort((a, b) => a.title.localeCompare(b.title));
      default:
        return movies;
    }
  }

  toggleGenre(genre: string) {
    this.activeGenre = this.activeGenre === genre ? null : genre;
  }

  openModal(movie: Movie) {
    this.selectedMovie = movie;
  }

  closeModal() {
    this.selectedMovie = null;
  }

  onModalSelectMovie(movie: Movie) {
    this.selectedMovie = movie;
  }
}
