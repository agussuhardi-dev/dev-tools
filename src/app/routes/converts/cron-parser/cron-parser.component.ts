import { Component, OnInit } from '@angular/core';
import { PageHeaderComponent } from '@shared';

@Component({
  selector: 'app-converts-cron-parser',
  templateUrl: './cron-parser.component.html',
  styleUrl: './cron-parser.component.scss',
  standalone: true,
  imports: [PageHeaderComponent]
})
export class ConvertsCronParserComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
