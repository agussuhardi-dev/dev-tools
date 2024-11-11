import { Component, OnInit } from '@angular/core';
import { BreadcrumbComponent, PageHeaderComponent } from '@shared';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatGridList, MatGridTile, MatGridTileText } from '@angular/material/grid-list';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import * as yaml from 'js-yaml';
import * as convert from 'xml-js';
import { MatButtonToggle, MatButtonToggleGroup } from '@angular/material/button-toggle';
import { NgIf } from '@angular/common';

type FormatType = 'JSON' | 'YAML' | 'XML';


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
    MatButtonToggleGroup,
    MatButtonToggle,
    NgIf,
  ],
})
export class ConvertsJsonYamlComponent {
  inputText: string = '';
  outputText: string = '';
  errorMessage: string = '';
  selectedInputType: FormatType = 'JSON';
  selectedOutputType: FormatType = 'YAML';

  onInputChange(event: Event) {
    const target = event.target as HTMLTextAreaElement;
    this.inputText = target.value;
    this.convert();
  }

  setInputType(type: FormatType) {
    this.selectedInputType = type;
    this.convert();
  }

  setOutputType(type: FormatType) {
    this.selectedOutputType = type;
    this.convert();
  }

  private convert() {
    this.errorMessage = '';
    this.outputText = '';

    if (this.inputText.trim() === '') {
      return;
    }

    try {
      let data: any;

      // Parse input
      switch (this.selectedInputType) {
        case 'JSON':
          data = JSON.parse(this.inputText);
          break;
        case 'YAML':
          data = yaml.load(this.inputText);
          break;
        case 'XML':
          data = convert.xml2js(this.inputText, { compact: true });
          break;
      }

      // Convert to output format
      switch (this.selectedOutputType) {
        case 'JSON':
          this.outputText = JSON.stringify(data, null, 2);
          break;
        case 'YAML':
          this.outputText = yaml.dump(data);
          break;
        case 'XML':
          this.outputText = convert.js2xml(data, { compact: true, spaces: 2 });
          break;
      }
    } catch (error) {
      console.error('Conversion error:', error);
      this.errorMessage = `Error: ${(error as Error).message}`;
    }
  }
}
