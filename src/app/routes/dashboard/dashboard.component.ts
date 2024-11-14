import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BreadcrumbComponent, PageHeaderComponent } from '@shared';
import { MatButtonModule } from '@angular/material/button';
import { MatList, MatListItem, MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    BreadcrumbComponent,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonToggleModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    FormsModule,
    NgIf,
    MatList,
    MatListItem,
    NgForOf,
  ],
})
export class DashboardComponent implements OnInit {
  userCount: number = 0;
  recentActivities: string[] = [];

  constructor() {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    // Simulate loading data from a service
    this.userCount = 1234;
    this.recentActivities = [
      'User John logged in',
      'New post created by Sarah',
      'Comment added by Mike',
    ];
  }

  refreshData(): void {
    this.loadDashboardData();
  }
}
