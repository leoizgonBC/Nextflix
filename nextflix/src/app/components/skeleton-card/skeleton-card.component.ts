import { Component } from '@angular/core';

@Component({
  selector: 'app-skeleton-card',
  standalone: true,
  template: `
    <div class="skeleton-card">
      <div class="skeleton-image shimmer"></div>
    </div>
  `,
  styles: [`
    .skeleton-card {
      flex-shrink: 0;
      width: 200px;
      height: 300px;
      border-radius: 4px;
      overflow: hidden;
    }
    .skeleton-image {
      width: 100%;
      height: 100%;
      background: #2a2a2a;
    }
    .shimmer {
      background: linear-gradient(90deg, #2a2a2a 25%, #3a3a3a 50%, #2a2a2a 75%);
      background-size: 200% 100%;
      animation: shimmer 1.5s infinite;
    }
    @keyframes shimmer {
      0% { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }
  `],
})
export class SkeletonCardComponent {}
