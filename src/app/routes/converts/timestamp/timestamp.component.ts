import { Component, OnInit } from '@angular/core';
import { PageHeaderComponent } from '@shared';

@Component({
  selector: 'app-converts-timestamp',
  templateUrl: './timestamp.component.html',
  styleUrl: './timestamp.component.scss',
  standalone: true,
  imports: [PageHeaderComponent]
})
export class ConvertsTimestampComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
