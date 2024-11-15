import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
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
          stagger('100ms', [
            animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class LoginComponent {

  private readonly auth = inject(AuthService);

  options = [
    { value: 'devtools', viewValue: 'DevTools', route: '/main', icon: 'build', color: '#4CAF50' },
    { value: 'rest-simulator', viewValue: 'Rest Simulator', route: '/rest-simulator', icon: 'http', color: '#2196F3' },
    { value: 'iso8583-simulator', viewValue: 'ISO8583 Simulator', route: 'https://github.com/agussuhardi-dev/iso8583-server-simulator', icon: 'memory', color: '#FF9800' },
    { value: 'profile', viewValue: 'Profile', route: '/profile', icon: 'person', color: '#E91E63' },
  ];

  constructor(private router: Router) {}

  onCardClick(option: any) {
    if (option.value === 'devtools') {
      this.routeDevTools();
    } else if (option.value === 'iso8583-simulator') {
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
}
