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
import { MatSelectModule } from '@angular/material/select';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'app-base64-text',
  templateUrl: './base64-text.component.html',
  styleUrls: ['./base64-text.component.scss'],
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
    MatSelectModule,
    MatTooltip,
  ],
})
export class EncodersDecodersBase64TextComponent  {
  selectedOperation: 'encode' | 'decode' = 'encode';
  selectedTextEncoding: 'ascii' | 'utf8' = 'utf8';
  inputText = '';
  outputText = '';
  errorMessage = '';

  constructor(
    private snackBar: MatSnackBar,
    private clipboard: Clipboard
  ) {}

  setOperation(operation: 'encode' | 'decode') {
    this.selectedOperation = operation;
    this.onInputChange();
  }

  onTextEncodingChange() {
    this.onInputChange();
  }

  clearAll() {
    this.inputText = '';
    this.outputText = '';
    this.errorMessage = '';
  }

  onInputChange() {
    this.errorMessage = '';
    if (!this.inputText) {
      this.outputText = '';
      return;
    }

    try {
      if (this.selectedOperation === 'encode') {
        this.outputText = this.encode(this.inputText);
      } else {
        this.outputText = this.decode(this.inputText);
      }
    } catch (error) {
      this.errorMessage = `Error: Invalid input for ${this.selectedOperation} operation`;
      this.outputText = '';
    }
  }

  encode(input: string): string {
    let bytes: Uint8Array;
    if (this.selectedTextEncoding === 'ascii') {
      bytes = new TextEncoder().encode(input.replace(/[^\x00-\x7F]/g, ''));
    } else {
      bytes = new TextEncoder().encode(input);
    }
    return btoa(String.fromCharCode.apply(null, Array.from(bytes)));
  }

  decode(input: string): string {
    const bytes = Uint8Array.from(atob(input), c => c.charCodeAt(0));
    if (this.selectedTextEncoding === 'ascii') {
      return String.fromCharCode.apply(
        null,
        Array.from(bytes).filter(b => b < 128)
      );
    } else {
      return new TextDecoder().decode(bytes);
    }
  }

  copyToClipboard(text: string) {
    this.clipboard.copy(text);
    this.snackBar.open('Copied to clipboard', 'Dismiss', { duration: 3000 });
  }

  async pasteFromClipboard() {
    try {
      const text = await navigator.clipboard.readText();
      this.inputText = text;
      this.onInputChange();
    } catch (error) {
      this.snackBar.open('Failed to paste from clipboard', 'Dismiss', { duration: 3000 });
    }
  }
}
