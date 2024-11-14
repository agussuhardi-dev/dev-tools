import { Component, ViewEncapsulation } from '@angular/core';
import { BreadcrumbComponent } from '@shared';
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
  selector: 'app-encoders-decoders-html',
  templateUrl: './html.component.html',
  styleUrls: ['./html.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    BreadcrumbComponent,
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
export class EncodersDecodersHtmlComponent {
  inputText: string = '';
  outputText: string = '';
  errorMessage: string = '';
  selectedOperation: 'encode' | 'decode' = 'encode';

  constructor(
    private clipboard: Clipboard,
    private snackBar: MatSnackBar
  ) {}

  onInputChange(event: Event) {
    const target = event.target as HTMLTextAreaElement;
    this.inputText = target.value;
    this.convert();
  }

  setOperation(operation: 'encode' | 'decode') {
    this.selectedOperation = operation;
    this.convert();
  }

  copyToClipboard(text: string) {
    this.clipboard.copy(text);
    this.snackBar.open('Copied to clipboard', 'Close', {
      duration: 2000,
    });
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

  clearAll() {
    this.inputText = '';
    this.outputText = '';
    this.errorMessage = '';
    this.snackBar.open('All fields cleared', 'Close', {
      duration: 2000,
    });
  }

  private convert() {
    this.errorMessage = '';
    this.outputText = '';

    if (this.inputText.trim() === '') {
      return;
    }

    try {
      if (this.selectedOperation === 'encode') {
        this.outputText = this.encodeHTML(this.inputText);
      } else {
        this.outputText = this.decodeHTML(this.inputText);
      }
    } catch (error) {
      console.error('Conversion error:', error);
      this.errorMessage = `Error: ${(error as Error).message}`;
    }
  }

  private encodeHTML(html: string): string {
    return html.replace(/[&<>"']/g, match => {
      const entityMap: { [key: string]: string } = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
      };
      return entityMap[match];
    });
  }

  private decodeHTML(encodedHtml: string): string {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = encodedHtml;
    return textarea.value;
  }
}
