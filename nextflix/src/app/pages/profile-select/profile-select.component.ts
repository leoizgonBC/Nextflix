import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserProfileService, AVATARS } from '../../services/user-profile.service';

@Component({
  selector: 'app-profile-select',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './profile-select.component.html',
  styleUrl: './profile-select.component.scss',
})
export class ProfileSelectComponent {
  private profileService = inject(UserProfileService);
  private router = inject(Router);

  avatars = AVATARS;
  profile = this.profileService.getProfile();
  editing = false;

  selectAvatar(avatar: string) {
    this.profile.avatar = avatar;
  }

  save() {
    this.profileService.saveProfile(this.profile);
    this.router.navigate(['/']);
  }
}
