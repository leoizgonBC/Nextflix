import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Movie } from '../../models/movie.interface';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { SkeletonCardComponent } from '../skeleton-card/skeleton-card.component';

@Component({
  selector: 'app-movie-row',
  standalone: true,
  imports: [MovieCardComponent, SkeletonCardComponent],
  templateUrl: './movie-row.component.html',
  styleUrl: './movie-row.component.scss',
})
export class MovieRowComponent {
  @Input({ required: true }) title!: string;
  @Input({ required: true }) movies!: Movie[];
  @Input() loading = false;
  @Input() expandable = true;
  @Output() selectMovie = new EventEmitter<Movie>();

  @ViewChild('rowContent') rowContent!: ElementRef<HTMLDivElement>;

  expanded = false;
  skeletonItems = Array(6).fill(0);

  scrollLeft() {
    this.rowContent.nativeElement.scrollBy({ left: -600, behavior: 'smooth' });
  }

  scrollRight() {
    this.rowContent.nativeElement.scrollBy({ left: 600, behavior: 'smooth' });
  }

  get displayedMovies(): Movie[] {
    if (this.expanded || !this.expandable) return this.movies;
    return this.movies.slice(0, 7);
  }

  get canExpand(): boolean {
    return this.expandable && this.movies.length > 7 && !this.expanded;
  }
}
