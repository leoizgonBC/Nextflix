import { Injectable } from '@angular/core';
import { UserProfile } from '../models/movie.interface';

export const AVATARS = [
  'https://i.pravatar.cc/150?img=1',
  'https://i.pravatar.cc/150?img=2',
  'https://i.pravatar.cc/150?img=3',
  'https://i.pravatar.cc/150?img=4',
  'https://i.pravatar.cc/150?img=5',
  'https://i.pravatar.cc/150?img=6',
  'https://i.pravatar.cc/150?img=7',
  'https://i.pravatar.cc/150?img=8',
];

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  private storageKey = 'nextflix_profile';

  getProfile(): UserProfile {
    const data = localStorage.getItem(this.storageKey);
    return data
      ? JSON.parse(data)
      : { name: 'User', avatar: AVATARS[0] };
  }

  saveProfile(profile: UserProfile): void {
    localStorage.setItem(this.storageKey, JSON.stringify(profile));
  }

  hasProfile(): boolean {
    return !!localStorage.getItem(this.storageKey);
  }
}
