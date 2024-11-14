import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { JsonPipe, NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-text-regex-tester',
  templateUrl: './regex-tester.component.html',
  styleUrl: './regex-tester.component.scss',
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
    NgIf,
    NgClass,
    JsonPipe,
  ],
})
export class TextRegexTesterComponent {
  regexPattern: string = '';
  testString: string = '';
  flags: string = '';
  matchResult: RegExpMatchArray | null = null;
  isValid: boolean = true;

  constructor(private snackBar: MatSnackBar) {}

  testRegex() {
    try {
      const regex = new RegExp(this.regexPattern, this.flags);
      this.matchResult = this.testString.match(regex);
      this.isValid = true;
    } catch (error) {
      this.isValid = false;
      this.matchResult = null;
      this.snackBar.open('Invalid regex pattern', 'Close', { duration: 3000 });
    }
  }
}
