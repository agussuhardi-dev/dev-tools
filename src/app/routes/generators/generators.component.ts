import { Component, OnInit } from '@angular/core';
import { PageHeaderComponent } from '@shared';

@Component({
  selector: 'app-generators-generators',
  templateUrl: './generators.component.html',
  styleUrl: './generators.component.scss',
  standalone: true,
  imports: [PageHeaderComponent]
})
export class GeneratorsGeneratorsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
