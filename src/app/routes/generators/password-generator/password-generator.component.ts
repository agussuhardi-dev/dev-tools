import { Component, OnInit } from '@angular/core';
import { PageHeaderComponent } from '@shared';

@Component({
  selector: 'app-generators-password-generator',
  templateUrl: './password-generator.component.html',
  styleUrl: './password-generator.component.scss',
  standalone: true,
  imports: [PageHeaderComponent]
})
export class GeneratorsPasswordGeneratorComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
