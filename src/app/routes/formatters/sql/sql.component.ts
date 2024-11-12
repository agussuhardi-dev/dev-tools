import { Component, OnInit } from '@angular/core';
import { PageHeaderComponent } from '@shared';

@Component({
  selector: 'app-formatters-sql',
  templateUrl: './sql.component.html',
  styleUrl: './sql.component.scss',
  standalone: true,
  imports: [PageHeaderComponent]
})
export class FormattersSqlComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
