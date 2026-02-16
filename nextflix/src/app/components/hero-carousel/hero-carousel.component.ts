import { Component, OnInit, OnDestroy, inject, Output, EventEmitter } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Movie } from '../../models/movie.interface';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-hero-carousel',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './hero-carousel.component.html',
  styleUrl: './hero-carousel.component.scss',
})
export class HeroCarouselComponent implements OnInit, OnDestroy {
  @Output() openDetail = new EventEmitter<Movie>();

  private movieService = inject(MovieService);
  private intervalId: ReturnType<typeof setInterval> | null = null;

  featuredMovies: Movie[] = [];
  currentIndex = 0;

  get currentMovie(): Movie {
    return this.featuredMovies[this.currentIndex];
  }

  ngOnInit() {
    this.featuredMovies = this.movieService.getFeaturedMovies();
    this.startAutoPlay();
  }

  ngOnDestroy() {
    this.stopAutoPlay();
  }

  startAutoPlay() {
    this.intervalId = setInterval(() => {
      this.next();
    }, 6000);
  }

  stopAutoPlay() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.featuredMovies.length;
  }

  prev() {
    this.currentIndex =
      (this.currentIndex - 1 + this.featuredMovies.length) %
      this.featuredMovies.length;
  }

  goTo(index: number) {
    this.currentIndex = index;
    this.stopAutoPlay();
    this.startAutoPlay();
  }
}
