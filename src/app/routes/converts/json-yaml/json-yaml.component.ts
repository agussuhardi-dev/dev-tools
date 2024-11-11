import { Component, OnInit } from '@angular/core';
import { BreadcrumbComponent, PageHeaderComponent } from '@shared';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatGridList, MatGridTile, MatGridTileText } from '@angular/material/grid-list';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-converts-json-yaml',
  templateUrl: './json-yaml.component.html',
  styleUrl: './json-yaml.component.scss',
  standalone: true,
  imports: [
    PageHeaderComponent,
    BreadcrumbComponent,
    MatCard,
    MatCardContent,
    MatGridList,
    MatGridTile,
    MatGridTileText,
    MatFormField,
    MatInput,
  ],
})
export class ConvertsJsonYamlComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  dogs = [
    { name: 'Porter', human: 'Kara' },
    { name: 'Mal', human: 'Jeremy' },
    { name: 'Koby', human: 'Igor' },
    { name: 'Razzle', human: 'Ward' },
    { name: 'Molly', human: 'Rob' },
    { name: 'Husi', human: 'Matias' },
  ];

  tiles = [
    { text: 'Cappuccino', cols: 3, rows: 1, color: 'lightblue' },
    { text: 'Mocha', cols: 1, rows: 2, color: 'lightgreen' },
    { text: 'Latte', cols: 1, rows: 1, color: 'lightpink' },
    { text: 'Iced coffee', cols: 2, rows: 1, color: '#DDBDF1' },
  ];

  fixedCols = 4;
  fixedRowHeight = 100;
  ratioGutter = '1';
  fitListHeight = '400px';
  ratio = '4:1';
}
