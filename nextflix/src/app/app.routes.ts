import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent) },
  { path: 'my-list', loadComponent: () => import('./pages/my-list/my-list.component').then(m => m.MyListComponent) },
  { path: 'movie/:id', loadComponent: () => import('./pages/movie-detail/movie-detail.component').then(m => m.MovieDetailComponent) },
  { path: 'profile', loadComponent: () => import('./pages/profile-select/profile-select.component').then(m => m.ProfileSelectComponent) },
  { path: '**', loadComponent: () => import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent) },
];
