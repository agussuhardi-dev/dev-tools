import { Component, OnInit } from '@angular/core';
import { PageHeaderComponent } from '@shared';

@Component({
  selector: 'app-formatters-xml',
  templateUrl: './xml.component.html',
  styleUrl: './xml.component.scss',
  standalone: true,
  imports: [PageHeaderComponent]
})
export class FormattersXmlComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
