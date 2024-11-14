import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-text-inspector-case-converter',
  templateUrl: './inspector-case-converter.component.html',
  styleUrl: './inspector-case-converter.component.scss',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonToggleModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    FormsModule,
  ],
})
export class TextInspectorCaseConverterComponent {
  originalText = '';
  convertedText = '';
  textInfo = {
    selection: { line: 0, column: 0, position: 0 },
    static: { characters: 0, words: 0, lines: 0, sentences: 0, paragraphs: 0, bytes: 0 },
  };

  constructor(private clipboardService: Clipboard) {}

  convertCase(caseType: string) {
    switch (caseType) {
      case 'sentence':
        this.convertedText = this.toSentenceCase(this.originalText);
        break;
      case 'lower':
        this.convertedText = this.originalText.toLowerCase();
        break;
      case 'upper':
        this.convertedText = this.originalText.toUpperCase();
        break;
      case 'title':
        this.convertedText = this.toTitleCase(this.originalText);
        break;
      case 'camel':
        this.convertedText = this.toCamelCase(this.originalText);
        break;
      case 'pascal':
        this.convertedText = this.toPascalCase(this.originalText);
        break;
      case 'snake':
        this.convertedText = this.toSnakeCase(this.originalText);
        break;
      case 'constant':
        this.convertedText = this.toConstantCase(this.originalText);
        break;
      case 'train':
        this.convertedText = this.toTrainCase(this.originalText);
        break;
      case 'alternating':
        this.convertedText = this.toAlternatingCase(this.originalText);
        break;
      case 'inverse':
        this.convertedText = this.toInverseCase(this.originalText);
        break;
    }
    this.updateTextInfo();
  }

  sortLines(sortType: string) {
    const lines = this.originalText.split('\n');
    switch (sortType) {
      case 'alphabetize':
        lines.sort((a, b) => a.localeCompare(b));
        break;
      case 'reverseAlphabetize':
        lines.sort((a, b) => b.localeCompare(a));
        break;
      case 'alphabetizeLastWord':
        lines.sort((a, b) => {
          const lastWordA = a.trim().split(' ').pop() || '';
          const lastWordB = b.trim().split(' ').pop() || '';
          return lastWordA.localeCompare(lastWordB);
        });
        break;
      case 'reverseAlphabetizeLastWord':
        lines.sort((a, b) => {
          const lastWordA = a.trim().split(' ').pop() || '';
          const lastWordB = b.trim().split(' ').pop() || '';
          return lastWordB.localeCompare(lastWordA);
        });
        break;
      case 'reverse':
        lines.reverse();
        break;
      case 'randomize':
        for (let i = lines.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [lines[i], lines[j]] = [lines[j], lines[i]];
        }
        break;
    }
    this.convertedText = lines.join('\n');
    this.updateTextInfo();
  }

  updateTextInfo() {
    const text = this.convertedText || this.originalText;
    this.textInfo.static = {
      characters: text.length,
      words: text.split(/\s+/).filter(word => word.length > 0).length,
      lines: text.split('\n').length,
      sentences: text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0).length,
      paragraphs: text.split('\n\n').filter(para => para.trim().length > 0).length,
      bytes: new Blob([text]).size,
    };
  }

  onTextAreaSelect(event: any) {
    const target = event.target;
    this.textInfo.selection = {
      line: target.value.substr(0, target.selectionStart).split('\n').length,
      column: target.selectionStart - target.value.lastIndexOf('\n', target.selectionStart - 1),
      position: target.selectionStart,
    };
  }

  copyText() {
    this.clipboardService.copy(this.convertedText || this.originalText);
  }

  pasteText() {
    navigator.clipboard.readText().then(text => {
      this.originalText = text;
      this.updateTextInfo();
    });
  }

  clearText() {
    this.originalText = '';
    this.convertedText = '';
    this.updateTextInfo();
  }

  // Helper methods for case conversions
  private toSentenceCase(text: string): string {
    return text.replace(/(^\s*\w|[.!?]\s*\w)/g, c => c.toUpperCase());
  }

  private toTitleCase(text: string): string {
    return text.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
  }

  private toCamelCase(text: string): string {
    return text
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
        index === 0 ? word.toLowerCase() : word.toUpperCase()
      )
      .replace(/\s+/g, '');
  }

  private toPascalCase(text: string): string {
    return text.replace(/(?:^\w|[A-Z]|\b\w)/g, word => word.toUpperCase()).replace(/\s+/g, '');
  }

  private toSnakeCase(text: string): string {
    return text.replace(/\s+/g, '_').toLowerCase();
  }

  private toConstantCase(text: string): string {
    return text.replace(/\s+/g, '_').toUpperCase();
  }

  private toTrainCase(text: string): string {
    return text.replace(/\s+/g, '-').toLowerCase();
  }

  private toAlternatingCase(text: string): string {
    return text
      .split('')
      .map((char, index) => (index % 2 === 0 ? char.toLowerCase() : char.toUpperCase()))
      .join('');
  }

  private toInverseCase(text: string): string {
    return text
      .split('')
      .map(char => (char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase()))
      .join('');
  }
}
