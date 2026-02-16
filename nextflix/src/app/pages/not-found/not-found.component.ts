import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="not-found">
      <h1 class="error-code">404</h1>
      <h2 class="error-title">Lost your way?</h2>
      <p class="error-message">
        Sorry, we can't find that page. You'll find lots to explore on the home page.
      </p>
      <a routerLink="/" class="home-btn">NEXTFLIX Home</a>
      <div class="error-detail">
        <span class="error-label">Error Code:</span> NSES-404
      </div>
    </div>
  `,
  styles: [`
    .not-found {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 20px;
      background: linear-gradient(135deg, #141414 0%, #1a1a2e 50%, #141414 100%);
    }
    .error-code {
      font-size: 120px;
      font-weight: 700;
      color: #e50914;
      margin: 0;
      line-height: 1;
      text-shadow: 0 0 40px rgba(229, 9, 20, 0.3);
    }
    .error-title {
      font-size: 36px;
      color: #fff;
      margin: 16px 0;
    }
    .error-message {
      color: #999;
      font-size: 18px;
      max-width: 500px;
      line-height: 1.5;
      margin: 0 0 32px;
    }
    .home-btn {
      display: inline-block;
      background: #fff;
      color: #000;
      padding: 12px 28px;
      border-radius: 4px;
      text-decoration: none;
      font-size: 16px;
      font-weight: 600;
      transition: opacity 200ms ease;
      &:hover { opacity: 0.8; }
    }
    .error-detail {
      margin-top: 40px;
      color: #555;
      font-size: 24px;
      .error-label { color: #666; }
    }
  `],
})
export class NotFoundComponent {}
