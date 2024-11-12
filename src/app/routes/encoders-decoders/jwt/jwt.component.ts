import { Component, OnInit } from '@angular/core';
import { PageHeaderComponent } from '@shared';

@Component({
  selector: 'app-encoders-decoders-jwt',
  templateUrl: './jwt.component.html',
  styleUrl: './jwt.component.scss',
  standalone: true,
  imports: [PageHeaderComponent]
})
export class EncodersDecodersJwtComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
