import { Component, OnInit } from '@angular/core';
import { PageHeaderComponent } from '@shared';

@Component({
  selector: 'app-encoders-decoders-certificate',
  templateUrl: './certificate.component.html',
  styleUrl: './certificate.component.scss',
  standalone: true,
  imports: [PageHeaderComponent],
})
export class EncodersDecodersCertificateComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
