import { Component, OnInit } from '@angular/core';
import { BreadcrumbComponent } from '@shared';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule } from '@angular/forms';
import { DatePipe, NgFor } from '@angular/common';

@Component({
  selector: 'app-converts-cron-parser',
  templateUrl: './cron-parser.component.html',
  styleUrl: './cron-parser.component.scss',
  standalone: true,
  imports: [
    MatCardModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTabsModule,
    FormsModule,
    NgFor,
    BreadcrumbComponent,
    DatePipe,
  ],
})
export class ConvertsCronParserComponent implements OnInit {
  cronExpression: string = '';
  executionTimes: Date[] = [];
  detailInformation: string = '';

  ngOnInit(): void {}

  convertCronExpression(): void {
    const cronExpressionParts = this.cronExpression.split(' ');
    if (cronExpressionParts.length !== 6) {
      this.executionTimes = [];
      this.detailInformation = '';
      return;
    }

    const seconds = cronExpressionParts[0];
    const minutes = cronExpressionParts[1];
    const hours = cronExpressionParts[2];
    const dayOfMonth = cronExpressionParts[3];
    const month = cronExpressionParts[4];
    const dayOfWeek = cronExpressionParts[5];

    this.executionTimes = [];
    this.detailInformation = '';

    const now = new Date();
    const nextExecutionDate = new Date(now.getTime());
    nextExecutionDate.setSeconds(now.getSeconds());
    nextExecutionDate.setMilliseconds(0);

    // Generate detail information
    if (seconds.includes('/')) {
      const interval = parseInt(seconds.split('/')[1]);
      this.detailInformation = `Every ${interval} seconds`;
    }
    if (minutes.includes('/')) {
      const interval = parseInt(minutes.split('/')[1]);
      this.detailInformation += `, every ${interval} minutes`;
    }
    if (hours.includes('/')) {
      const interval = parseInt(hours.split('/')[1]);
      this.detailInformation += `, every ${interval} hours`;
    }
    if (dayOfMonth.includes('/')) {
      const interval = parseInt(dayOfMonth.split('/')[1]);
      this.detailInformation += `, every ${interval} days`;
    }
    if (month.includes('/')) {
      const interval = parseInt(month.split('/')[1]);
      this.detailInformation += `, every ${interval} months`;
    }
    if (dayOfWeek.includes('/')) {
      const interval = parseInt(dayOfWeek.split('/')[1]);
      this.detailInformation += `, every ${interval} weeks`;
    }

    // Generate next 10 execution times
    for (let i = 0; i < 10; i++) {
      const executionTime = new Date(nextExecutionDate.getTime());
      if (seconds.includes('/')) {
        const interval = parseInt(seconds.split('/')[1]);
        executionTime.setSeconds(executionTime.getSeconds() + i * interval);
      }
      if (minutes.includes('/')) {
        const interval = parseInt(minutes.split('/')[1]);
        executionTime.setMinutes(executionTime.getMinutes() + i * interval);
      }
      if (hours.includes('/')) {
        const interval = parseInt(hours.split('/')[1]);
        executionTime.setHours(executionTime.getHours() + i * interval);
      }
      this.executionTimes.push(executionTime);
    }
  }
}
