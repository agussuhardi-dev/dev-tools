import { Component, HostListener, inject, OnInit } from '@angular/core';
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
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(50px)' }),
        animate('300ms', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
    trigger('flyingAnimal', [
      transition(':enter', [
        animate('10s', keyframes([
          style({ transform: 'translateX(-100%) translateY(100px) scale(0.5)', offset: 0 }),
          style({ transform: 'translateX(50%) translateY(50px) scale(1)', offset: 0.4 }),
          style({ transform: 'translateX(75%) translateY(100px) scale(0.8)', offset: 0.7 }),
          style({ transform: 'translateX(100%) translateY(50px) scale(0.5)', offset: 1 }),
        ])),
      ]),
    ]),
  ],
})
export class LoginComponent  implements OnInit {
  showFlyingInsect = true;
  insectPosition = { x: 0, y: 0 };

  options = [
    { value: 'devtools', viewValue: 'DevTools', route: '/main', icon: 'build', color: '#4CAF50' },
    { value: 'rest-simulator', viewValue: 'Rest Simulator', route: '/rest-simulator', icon: 'http', color: '#2196F3' },
    { value: 'iso8583-simulator', viewValue: 'ISO8583 Simulator', route: 'https://github.com/agussuhardi-dev/iso8583-server-simulator', icon: 'memory', color: '#FF9800' },
    { value: 'profile', viewValue: 'Profile', route: '/profile', icon: 'person', color: '#E91E63' },
  ];

  constructor(private router: Router, private auth: AuthService) {}

  ngOnInit() {
    this.moveInsect(); // Set initial random position
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

  moveInsect() {
    const maxX = window.innerWidth - 48; // 48 is the insect's font size
    const maxY = window.innerHeight - 48;
    this.insectPosition = {
      x: Math.random() * maxX,
      y: Math.random() * maxY
    };
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    const insectElement = document.querySelector('.flying-insect') as HTMLElement;
    if (insectElement) {
      const rect = insectElement.getBoundingClientRect();
      if (
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom
      ) {
        this.moveInsect();
      }
    }
  }
}
