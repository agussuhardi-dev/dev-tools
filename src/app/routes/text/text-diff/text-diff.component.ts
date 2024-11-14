import { Component, OnInit } from '@angular/core';
import { PageHeaderComponent } from '@shared';

@Component({
  selector: 'app-text-text-diff',
  templateUrl: './text-diff.component.html',
  styleUrl: './text-diff.component.scss',
  standalone: true,
  imports: [PageHeaderComponent]
})
export class TextTextDiffComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
