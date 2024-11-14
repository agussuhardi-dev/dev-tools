import { Component, OnInit } from '@angular/core';
import { PageHeaderComponent } from '@shared';

@Component({
  selector: 'app-text-text',
  templateUrl: './text.component.html',
  styleUrl: './text.component.scss',
  standalone: true,
  imports: [PageHeaderComponent]
})
export class TextTextComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
