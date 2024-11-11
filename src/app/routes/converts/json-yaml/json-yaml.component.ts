import { Component, OnInit } from '@angular/core';
import { BreadcrumbComponent, PageHeaderComponent } from '@shared';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatGridList, MatGridTile, MatGridTileText } from '@angular/material/grid-list';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import * as convert from 'xml-js';

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
export class ConvertsJsonYamlComponent {
  inputArea = '';
  outputArea = '';

  onJsonInputChange(event: Event) {
    const target = event.target as HTMLTextAreaElement;
    this.inputArea = target.value;
    this.convertToXml();
  }

  private convertToXml() {
    try {
      if (this.inputArea.trim() === '') {
        this.outputArea = '';
        return;
      }
      // Parse JSON string to object
      const jsonData = JSON.parse(this.inputArea);

      // Convert JSON object to XML string
      this.outputArea = convert.js2xml(jsonData, {compact: true, spaces: 2});
    } catch (error) {
      console.error('Error converting JSON to XML:', error);
      this.outputArea = 'Error: Invalid JSON input';
    }
  }
}
