import { Component, OnInit } from '@angular/core';
import { PageHeaderComponent } from '@shared';

@Component({
  selector: 'app-encoders-decoders-url',
  templateUrl: './url.component.html',
  styleUrl: './url.component.scss',
  standalone: true,
  imports: [PageHeaderComponent]
})
export class EncodersDecodersUrlComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
