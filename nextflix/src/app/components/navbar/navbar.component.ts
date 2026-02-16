import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserProfileService } from '../../services/user-profile.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  private router = inject(Router);
  private profileService = inject(UserProfileService);

  searchOpen = false;
  searchQuery = '';

  get profile() {
    return this.profileService.getProfile();
  }

  toggleSearch() {
    this.searchOpen = !this.searchOpen;
    if (!this.searchOpen) {
      this.searchQuery = '';
      this.router.navigate(['/']);
    }
  }

  onSearchInput() {
    if (this.searchQuery) {
      this.router.navigate(['/'], { queryParams: { q: this.searchQuery } });
    } else {
      this.router.navigate(['/']);
    }
  }
}
