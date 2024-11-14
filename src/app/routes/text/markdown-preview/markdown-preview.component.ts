import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { marked } from 'marked'; // Correct import for marked

@Component({
  selector: 'app-text-markdown-preview',
  templateUrl: './markdown-preview.component.html',
  styleUrl: './markdown-preview.component.scss',
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
export class TextMarkdownPreviewComponent {
  markdownInput = '';
  markdownOutput = '';

  constructor(private snackBar: MatSnackBar) {}

  async updatePreview() {
    this.markdownOutput = await marked(this.markdownInput);
  }

  copyToClipboard(text: string) {
    navigator.clipboard.writeText(text).then(() => {
      this.snackBar.open('Copied to clipboard', 'Close', { duration: 2000 });
    });
  }

  loadFile(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = e => {
        this.markdownInput = e.target?.result as string;
        this.updatePreview();
      };
      reader.readAsText(file);
    }
  }

  pasteFromClipboard() {
    navigator.clipboard.readText().then(text => {
      this.markdownInput = text;
      this.updatePreview();
    });
  }
}
