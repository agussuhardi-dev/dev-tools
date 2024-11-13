import { Component, OnInit } from '@angular/core';
import { PageHeaderComponent } from '@shared';

@Component({
  selector: 'app-generators-lorem-ipsum',
  templateUrl: './lorem-ipsum.component.html',
  styleUrl: './lorem-ipsum.component.scss',
  standalone: true,
  imports: [PageHeaderComponent]
})
export class GeneratorsLoremIpsumComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
