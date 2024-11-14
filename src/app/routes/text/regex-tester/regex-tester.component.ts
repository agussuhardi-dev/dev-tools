import { Component, OnInit } from '@angular/core';
import { PageHeaderComponent } from '@shared';

@Component({
  selector: 'app-text-regex-tester',
  templateUrl: './regex-tester.component.html',
  styleUrl: './regex-tester.component.scss',
  standalone: true,
  imports: [PageHeaderComponent]
})
export class TextRegexTesterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
