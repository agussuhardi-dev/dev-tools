import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { NgForOf } from '@angular/common';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'app-text-text-diff',
  templateUrl: './text-diff.component.html',
  styleUrl: './text-diff.component.scss',
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
    MatSlideToggle,
    MatTooltip,
    NgForOf,
  ],
})
export class TextTextDiffComponent {
  oldText = '';
  newText = '';
  differences: string[] = [];
  inlineMode = false;

  constructor(private snackBar: MatSnackBar) {}

  comparetexts() {
    const oldLines = this.oldText.split('\n');
    const newLines = this.newText.split('\n');
    this.differences = [];

    for (let i = 0; i < Math.max(oldLines.length, newLines.length); i++) {
      if (oldLines[i] !== newLines[i]) {
        if (i < oldLines.length) {
          this.differences.push(`- ${oldLines[i]}`);
        }
        if (i < newLines.length) {
          this.differences.push(`+ ${newLines[i]}`);
        }
      } else {
        this.differences.push(`  ${oldLines[i]}`);
      }
    }
  }

  copyToClipboard(text: string) {
    navigator.clipboard.writeText(text).then(() => {
      this.snackBar.open('Copied to clipboard', 'Close', { duration: 2000 });
    });
  }

  pasteFromClipboard(target: 'old' | 'new') {
    navigator.clipboard.readText().then(text => {
      if (target === 'old') {
        this.oldText = text;
      } else {
        this.newText = text;
      }
      this.snackBar.open('Pasted from clipboard', 'Close', { duration: 2000 });
    });
  }

  clearText(target: 'old' | 'new') {
    if (target === 'old') {
      this.oldText = '';
    } else {
      this.newText = '';
    }
  }
}
