import { Component, OnInit } from '@angular/core';
import { PageHeaderComponent } from '@shared';

@Component({
  selector: 'app-converts-number-base',
  templateUrl: './number-base.component.html',
  styleUrl: './number-base.component.scss',
  standalone: true,
  imports: [PageHeaderComponent]
})
export class ConvertsNumberBaseComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
