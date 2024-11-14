import { Component, OnInit } from '@angular/core';
import { PageHeaderComponent } from '@shared';

@Component({
  selector: 'app-text-markdown-preview',
  templateUrl: './markdown-preview.component.html',
  styleUrl: './markdown-preview.component.scss',
  standalone: true,
  imports: [PageHeaderComponent]
})
export class TextMarkdownPreviewComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
