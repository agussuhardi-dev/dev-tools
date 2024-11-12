import { Component, OnInit } from '@angular/core';
import { PageHeaderComponent } from '@shared';

@Component({
  selector: 'app-encoders-decoders-base64-text',
  templateUrl: './base64-text.component.html',
  styleUrl: './base64-text.component.scss',
  standalone: true,
  imports: [PageHeaderComponent]
})
export class EncodersDecodersBase64TextComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
