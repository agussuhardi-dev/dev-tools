import { Component, OnInit } from '@angular/core';
import { PageHeaderComponent } from '@shared';

@Component({
  selector: 'app-encoders-decoders-gzip',
  templateUrl: './gzip.component.html',
  styleUrl: './gzip.component.scss',
  standalone: true,
  imports: [PageHeaderComponent]
})
export class EncodersDecodersGzipComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
