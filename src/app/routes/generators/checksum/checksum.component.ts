import { Component, OnInit } from '@angular/core';
import { PageHeaderComponent } from '@shared';

@Component({
  selector: 'app-generators-checksum',
  templateUrl: './checksum.component.html',
  styleUrl: './checksum.component.scss',
  standalone: true,
  imports: [PageHeaderComponent]
})
export class GeneratorsChecksumComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
