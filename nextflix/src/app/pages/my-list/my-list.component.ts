import { Component, inject } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { FavoritesService } from '../../services/favorites.service';
import { WatchHistoryService } from '../../services/watch-history.service';
import { Movie } from '../../models/movie.interface';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { MovieModalComponent } from '../../components/movie-modal/movie-modal.component';

@Component({
  selector: 'app-my-list',
  standalone: true,
  imports: [MovieCardComponent, MovieModalComponent],
  templateUrl: './my-list.component.html',
  styleUrl: './my-list.component.scss',
})
export class MyListComponent {
  private movieService = inject(MovieService);
  private favoritesService = inject(FavoritesService);
  private watchHistoryService = inject(WatchHistoryService);

  selectedMovie: Movie | null = null;
  activeTab: 'favorites' | 'watched' = 'favorites';

  get favoriteMovies(): Movie[] {
    return this.favoritesService
      .getFavorites()
      .map((id) => this.movieService.getMovieById(id))
      .filter((m): m is Movie => !!m);
  }

  get watchedMovies(): Movie[] {
    return this.watchHistoryService
      .getWatched()
      .map((id) => this.movieService.getMovieById(id))
      .filter((m): m is Movie => !!m);
  }

  get currentMovies(): Movie[] {
    return this.activeTab === 'favorites' ? this.favoriteMovies : this.watchedMovies;
  }

  openModal(movie: Movie) {
    this.selectedMovie = movie;
  }

  closeModal() {
    this.selectedMovie = null;
  }
}
