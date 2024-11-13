import { Component, OnInit } from '@angular/core';
import { PageHeaderComponent } from '@shared';

@Component({
  selector: 'app-generators-hash',
  templateUrl: './hash.component.html',
  styleUrl: './hash.component.scss',
  standalone: true,
  imports: [PageHeaderComponent]
})
export class GeneratorsHashComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
