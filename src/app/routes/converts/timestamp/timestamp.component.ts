import { Component, OnInit } from '@angular/core';
import { BreadcrumbComponent } from '@shared';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { MatNativeDateModule, MatOption } from '@angular/material/core';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { MatSelect } from '@angular/material/select';

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
  ],
})
export class ConvertsTimestampComponent implements OnInit {
  timeInfo: any = {};
  inputDatetime: string = '';
  inputEpoch: number | null = null;
  selectedTimeZone: any;
  timeZones: any[] = [];
  errorMessage: string = '';
  protected readonly Object = Object;

  ngOnInit() {
    this.timeZones = [
      { name: 'UTC-12:00 (Baker Island Time)', offset: 'Etc/GMT+12' },
      { name: 'UTC-11:00 (Samoa Time)', offset: 'Etc/GMT+11' },
      { name: 'UTC-10:00 (Hawaii-Aleutian Time)', offset: 'Etc/GMT+10' },
      { name: 'UTC-09:00 (Alaska Time)', offset: 'Etc/GMT+9' },
      { name: 'UTC-08:00 (Pacific Time)', offset: 'Etc/GMT+8' },
      { name: 'UTC-07:00 (Mountain Time)', offset: 'Etc/GMT+7' },
      { name: 'UTC-06:00 (Central Time)', offset: 'Etc/GMT+6' },
      { name: 'UTC-05:00 (Eastern Time)', offset: 'Etc/GMT+5' },
      { name: 'UTC-04:00 (Atlantic Time)', offset: 'Etc/GMT+4' },
      { name: 'UTC-03:00 (West Africa Time)', offset: 'Etc/GMT+3' },
      { name: 'UTC-02:00 (Mid-Atlantic Time)', offset: 'Etc/GMT+2' },
      { name: 'UTC-01:00 (Greenwich Mean Time)', offset: 'Etc/GMT+1' },
      { name: 'UTC+00:00 (Coordinated Universal Time)', offset: 'Etc/GMT' },
      { name: 'UTC+01:00 (Central European Time)', offset: 'Etc/GMT-1' },
      { name: 'UTC+02:00 (Eastern European Time)', offset: 'Etc/GMT-2' },
      { name: 'UTC+03:00 (Moscow Time)', offset: 'Etc/GMT-3' },
      { name: 'UTC+04:00 (Astrakhan Time)', offset: 'Etc/GMT-4' },
      { name: 'UTC+05:00 (Pakistan Time)', offset: 'Etc/GMT-5' },
      { name: 'UTC+06:00 (Bangladesh Time)', offset: 'Etc/GMT-6' },
      { name: 'UTC+07:00 (Krasnoyarsk Time)', offset: 'Etc/GMT-7' },
      { name: 'UTC+08:00 (China Standard Time)', offset: 'Etc/GMT-8' },
      { name: 'UTC+09:00 (Japan Standard Time)', offset: 'Etc/GMT-9' },
      { name: 'UTC+10:00 (Australian Western Standard Time)', offset: 'Etc/GMT-10' },
      { name: 'UTC+11:00 (Solomon Islands Time)', offset: 'Etc/GMT-11' },
      { name: 'UTC+12:00 (Kiribati Time)', offset: 'Etc/GMT-12' },
      { name: 'UTC+13:00 (New Zealand Standard Time)', offset: 'Etc/GMT-13' },
      { name: 'UTC+14:00 (Line Islands Time)', offset: 'Etc/GMT-14' },
    ];
    this.selectedTimeZone = this.timeZones[12];
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
      second: timeParts[2],
      formattedDate: formattedDate,
    };
  }
}
