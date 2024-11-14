import { Component, OnInit } from '@angular/core';
import { BreadcrumbComponent } from '@shared';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { NgFor, NgForOf, NgIf } from '@angular/common';
import { MatNativeDateModule, MatOption } from '@angular/material/core';
import { MatTab, MatTabGroup, MatTabsModule } from '@angular/material/tabs';
import { MatSelect, MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-converts-timestamp',
  templateUrl: './timestamp.component.html',
  styleUrl: './timestamp.component.scss',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatListModule,
    FormsModule,
    NgIf,
    NgFor,
    BreadcrumbComponent,
    MatTabGroup,
    MatTab,
    MatSelect,
    MatOption,

    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTabsModule,
    MatListModule,
    NgForOf,
  ],
})
export class ConvertsTimestampComponent implements OnInit {
  timeInfo: any = {};
  inputDatetime: string = '';
  inputEpoch: number | null = null;
  selectedTimeZone: any;
  timeZones: any[] = [];
  errorMessage: string = '';

  ngOnInit() {
    this.timeZones = [
      { name: 'UTC-12:00 (Baker Island Time)', offset: 'Etc/GMT+12' },
      { name: 'UTC-11:00 (Samoa Time)', offset: 'Etc/GMT+11' },
      { name: 'UTC-10:00 (Hawaii-Aleutian Time)', offset: 'Pacific/Honolulu' },
      { name: 'UTC-09:00 (Alaska Time)', offset: 'America/Anchorage' },
      { name: 'UTC-08:00 (Pacific Time)', offset: 'America/Los_Angeles' },
      { name: 'UTC-07:00 (Mountain Time)', offset: 'America/Denver' },
      { name: 'UTC-06:00 (Central Time)', offset: 'America/Chicago' },
      { name: 'UTC-05:00 (Eastern Time)', offset: 'America/New_York' },
      { name: 'UTC-04:00 (Atlantic Time)', offset: 'America/Halifax' },
      { name: 'UTC-03:00 (Brasilia Time)', offset: 'America/Sao_Paulo' },
      { name: 'UTC-02:00 (Fernando de Noronha Time)', offset: 'America/Noronha' },
      { name: 'UTC-01:00 (Azores Time)', offset: 'Atlantic/Azores' },
      { name: 'UTC+00:00 (Greenwich Mean Time)', offset: 'UTC' },
      { name: 'UTC+01:00 (Central European Time)', offset: 'Europe/Paris' },
      { name: 'UTC+02:00 (Eastern European Time)', offset: 'Europe/Kiev' },
      { name: 'UTC+03:00 (Moscow Time)', offset: 'Europe/Moscow' },
      { name: 'UTC+04:00 (Gulf Standard Time)', offset: 'Asia/Dubai' },
      { name: 'UTC+05:00 (Pakistan Standard Time)', offset: 'Asia/Karachi' },
      { name: 'UTC+05:30 (India Standard Time)', offset: 'Asia/Kolkata' },
      { name: 'UTC+06:00 (Bangladesh Standard Time)', offset: 'Asia/Dhaka' },
      { name: 'UTC+07:00 (Indochina Time)', offset: 'Asia/Bangkok' },
      { name: 'UTC+08:00 (China Standard Time)', offset: 'Asia/Shanghai' },
      { name: 'UTC+09:00 (Japan Standard Time)', offset: 'Asia/Tokyo' },
      { name: 'UTC+10:00 (Australian Eastern Standard Time)', offset: 'Australia/Sydney' },
      { name: 'UTC+11:00 (Solomon Islands Time)', offset: 'Pacific/Guadalcanal' },
      { name: 'UTC+12:00 (New Zealand Standard Time)', offset: 'Pacific/Auckland' },
    ];
    this.selectedTimeZone = this.timeZones[12]; // Default to UTC
  }

  convertTime(): void {
    let inputDate: Date;
    if (this.inputEpoch !== null) {
      inputDate = new Date(this.inputEpoch);
    } else {
      inputDate = new Date(this.inputDatetime);
    }

    if (isNaN(inputDate.getTime())) {
      this.errorMessage = 'Invalid input. Please enter a valid date or epoch time.';
      this.timeInfo = {};
      return;
    }
    this.errorMessage = '';
    this.timeInfo = {
      Local: this.getFullTimeInfo(inputDate, Intl.DateTimeFormat().resolvedOptions().timeZone),
      GMT: this.getFullTimeInfo(inputDate, 'GMT'),
      Selected: this.getFullTimeInfo(inputDate, this.selectedTimeZone.offset),
    };
  }

  private getFullTimeInfo(date: Date, timezone: string): any {
    const options: Intl.DateTimeFormatOptions = {
      timeZone: timezone,
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short',
    };

    const formattedDate = date.toLocaleString('en-US', options);
    const parts = formattedDate.split(', ');
    const dateParts = parts[0].split(' ');
    const timeParts = parts[1].split(':');

    return {
      year: dateParts[2],
      month: dateParts[0],
      day: dateParts[1],
      hour: timeParts[0],
      minute: timeParts[1],
      second: timeParts[2].split(' ')[0],
      timeZone: parts[2],
      formattedDate: formattedDate,
    };
  }

  protected readonly Object = Object;
}
