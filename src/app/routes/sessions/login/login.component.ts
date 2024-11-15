import { Component, HostListener, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { trigger, transition, style, animate, query, stagger, keyframes } from '@angular/animations';
import { filter } from 'rxjs/operators';

import { AuthService } from '@core/authentication';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
  ],
  animations: [
    trigger('cardAnimation', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(-15px)' }),
          stagger('50ms', [
            animate('250ms ease-out', style({ opacity: 1, transform: 'translateY(0px)' })),
          ]),
        ], { optional: true }),
      ]),
    ]),
  ],
})
export class LoginComponent implements OnInit, OnDestroy {
  showFlyingInsect = true;
  beeStyle: Record<string, string> = {};
  isResting = false;
  private animationFrameId: number | null = null;
  private posX = 0;
  private posY = 0;
  private velX = 2;
  private velY = 1;
  private restTimeout: any;

  options = [
    { value: 'devtools', viewValue: 'DevTools', route: '/main', icon: 'build', color: '#4CAF50' },
    { value: 'rest-simulator', viewValue: 'Rest Simulator', route: '/rest-simulator', icon: 'http', color: '#2196F3' },
    { value: 'iso8583-simulator', viewValue: 'ISO8583 Simulator', route: 'https://github.com/agussuhardi-dev/iso8583-server-simulator', icon: 'memory', color: '#FF9800' },
    { value: 'profile', viewValue: 'Profile', route: '/profile', icon: 'person', color: '#E91E63' },
  ];

  constructor(private router: Router, private auth: AuthService) {}

  ngOnInit() {
    this.moveBee();
  }

  ngOnDestroy() {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
    }
    if (this.restTimeout) {
      clearTimeout(this.restTimeout);
    }
  }

  onCardClick(option: any) {
    if (option.value === 'devtools') {
      this.routeDevTools();
    } else if (option.route.startsWith('http')) {
      window.open(option.route, '_blank');
    } else {
      this.router.navigate([option.route]);
    }
  }

  routeDevTools() {
    this.auth
      .login('DevTools', 'random', true)
      .pipe(filter(authenticated => authenticated))
      .subscribe({
        next: () => {
          this.router.navigateByUrl('/');
        }
      });
  }

  private moveBee() {
    if (!this.isResting) {
      this.posX += this.velX;
      this.posY += this.velY;

      // Bounce off the edges
      if (this.posX <= 0 || this.posX >= window.innerWidth - 48) {
        this.velX = -this.velX;
      }
      if (this.posY <= 0 || this.posY >= window.innerHeight - 48) {
        this.velY = -this.velY;
      }

      // Add some randomness to the movement
      this.velX += (Math.random() - 0.5) * 0.5;
      this.velY += (Math.random() - 0.5) * 0.5;

      // Clamp velocity
      this.velX = Math.max(Math.min(this.velX, 5), -5);
      this.velY = Math.max(Math.min(this.velY, 3), -3);

      this.beeStyle = {
        transform: `translate(${this.posX}px, ${this.posY}px)`,
      };

      // Randomly decide to rest
      if (Math.random() < 0.005) { // 0.5% chance to rest each frame
        this.isResting = true;
        this.beeStyle['transition'] = 'all 0.5s ease-out';
        this.beeStyle['transform'] += ' scale(1.2)'; // Bee gets slightly bigger when resting
        this.restTimeout = setTimeout(() => {
          this.isResting = false;
          delete this.beeStyle['transition'];
          this.beeStyle['transform'] = this.beeStyle['transform'].replace(' scale(1.2)', '');
        }, 2000 + Math.random() * 3000); // Rest for 2-5 seconds
      }
    }

    this.animationFrameId = requestAnimationFrame(() => this.moveBee());
  }
}
