import { Component, ViewEncapsulation } from '@angular/core';
import { BreadcrumbComponent, PageHeaderComponent } from '@shared';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-formatters-json',
  templateUrl: './json.component.html',
  styleUrls: ['./json.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    BreadcrumbComponent,
    PageHeaderComponent,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonToggleModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    FormsModule,
    NgIf,
  ],
})
export class FormattersJsonComponent {
  inputText: string = '';
  outputText: string = '';
  errorMessage: string = '';
  selectedOperation: 'escape' | 'unescape' | 'uglify' | 'prettify' | 'validate' = 'prettify';

  constructor(private snackBar: MatSnackBar, private clipboard: Clipboard) {}

  setOperation(operation: 'escape' | 'unescape' | 'uglify' | 'prettify' | 'validate') {
    this.selectedOperation = operation;
    this.convert();
  }

  convert() {
    this.errorMessage = '';
    this.outputText = '';

    if (this.inputText.trim() === '') {
      return;
    }

    try {
      switch (this.selectedOperation) {
        case 'escape':
          this.outputText = JSON.stringify(this.inputText);
          break;
        case 'unescape':
          // Parse the input as JSON, then stringify it to pretty-print
          const parsed = JSON.parse(this.inputText);
          this.outputText = typeof parsed === 'string' ? parsed : JSON.stringify(parsed, null, 2);
          break;
        case 'uglify':
          this.outputText = JSON.stringify(JSON.parse(this.inputText));
          break;
        case 'prettify':
          this.outputText = JSON.stringify(JSON.parse(this.inputText), null, 2);
          break;
        case 'validate':
          JSON.parse(this.inputText);
          this.snackBar.open('JSON is valid', 'Close', { duration: 2000 });
          return;
      }
    } catch (error) {
      console.error('Conversion error:', error);
      this.errorMessage = `Error: ${(error as Error).message}`;
    }
  }

  onInputChange(event: Event) {
    this.inputText = (event.target as HTMLTextAreaElement).value;
    this.convert();
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
      this.snackBar.open('Failed to paste from clipboard', 'Close', {
        duration: 2000,
      });
    }
  }

  openJsonFile(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.inputText = e.target?.result as string;
        this.convert();
      };
      reader.onerror = (e) => {
        this.errorMessage = 'Error reading file: ' + (reader.error?.message || 'Unknown error');
      };
      reader.readAsText(file);
    }
  }
}
