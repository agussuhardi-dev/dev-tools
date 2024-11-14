import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-formatters-xml',
  templateUrl: './xml.component.html',
  styleUrls: ['./xml.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatButtonToggleModule,
  ],
})
export class FormattersXmlComponent {
  inputText = '';
  outputText = '';
  errorMessage = '';
  selectedOperation: 'prettify' | 'minify' | 'validate' = 'prettify';

  constructor(
    private snackBar: MatSnackBar,
    private clipboard: Clipboard
  ) {}

  convert() {
    this.errorMessage = '';
    this.outputText = '';

    if (!this.inputText.trim()) return;

    try {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(this.inputText, 'text/xml');

      if (xmlDoc.getElementsByTagName('parsererror').length > 0) {
        throw new Error('Invalid XML');
      }

      switch (this.selectedOperation) {
        case 'prettify':
          this.outputText = this.formatXml(this.inputText);
          break;
        case 'minify':
          this.outputText = this.inputText.replace(/>\s*</g, '><').trim();
          break;
        case 'validate':
          this.snackBar.open('XML is valid', 'Close', { duration: 2000 });
          return;
      }
    } catch (error) {
      console.error('Conversion error:', error);
      this.errorMessage = `Error: ${(error as Error).message}`;
    }
  }

  formatXml(xml: string): string {
    const PADDING = ' '.repeat(2); // 2 spaces
    let depth = 0;
    let formatted = '';
    const lines = xml.replace(/>\s*</g, '>\n<').split('\n');

    for (const line of lines) {
      const indent = PADDING.repeat(depth);
      const trimmedLine = line.trim();

      if (trimmedLine.startsWith('</')) {
        depth--;
      }

      formatted += indent + trimmedLine + '\n';

      if (
        trimmedLine.startsWith('<') &&
        !trimmedLine.startsWith('</') &&
        !trimmedLine.endsWith('/>')
      ) {
        depth++;
      }
    }

    return formatted.trim();
  }

  clearAll() {
    this.inputText = '';
    this.outputText = '';
    this.errorMessage = '';
  }

  copyToClipboard(text: string) {
    this.clipboard.copy(text);
    this.snackBar.open('Copied to clipboard', 'Close', { duration: 2000 });
  }

  async pasteFromClipboard() {
    try {
      const text = await navigator.clipboard.readText();
      this.inputText = text;
      this.convert();
    } catch (err) {
      console.error('Failed to read clipboard contents: ', err);
      this.snackBar.open('Failed to paste from clipboard', 'Close', { duration: 2000 });
    }
  }

  openXmlFile(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = e => {
        this.inputText = e.target?.result as string;
        this.convert();
      };
      reader.onerror = e => {
        this.errorMessage = 'Error reading file: ' + (reader.error?.message || 'Unknown error');
      };
      reader.readAsText(file);
    }
  }
}
