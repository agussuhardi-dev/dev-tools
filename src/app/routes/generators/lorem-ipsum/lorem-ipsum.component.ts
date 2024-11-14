import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Clipboard } from '@angular/cdk/clipboard';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { loremIpsum, LoremIpsum } from 'lorem-ipsum';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTooltip } from '@angular/material/tooltip';
import { NgIf } from '@angular/common';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@Component({
  selector: 'app-generators-lorem-ipsum',
  templateUrl: './lorem-ipsum.component.html',
  styleUrls: ['./lorem-ipsum.component.scss'],
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
    MatSelect,
    MatOption,
    ReactiveFormsModule,
    MatTooltip,
  ],
})
export class GeneratorsLoremIpsumComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  generatedText = '';

  constructor(
    private fb: FormBuilder,
    private clipboard: Clipboard,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      type: ['word', Validators.required],
      length: [1, [Validators.required, Validators.min(1)]],
      wordType: ['lorem', Validators.required],
    });
  }

  generateText() {
    const { type, length, wordType } = this.form.value;

    const lorem = new LoremIpsum({
      sentencesPerParagraph: {
        max: 8,
        min: 4,
      },
      wordsPerSentence: {
        max: 16,
        min: 4,
      },
    });

    if (wordType === 'lorem') {
      this.generatedText =
        type === 'word'
          ? lorem.generateWords(length)
          : type === 'sentence'
            ? lorem.generateSentences(length)
            : lorem.generateParagraphs(length);
    } else if (wordType === 'natural') {
      this.generatedText =
        type === 'word'
          ? loremIpsum({ count: length, units: 'words' })
          : type === 'sentence'
            ? loremIpsum({ count: length, units: 'sentences' })
            : loremIpsum({ count: length, units: 'paragraphs' });
    } else {
      // Use random words
      this.generatedText = loremIpsum({
        count: length,
        units: type,
        format: 'plain',
        random: Math.random,
      });
    }
  }

  copyToClipboard() {
    this.clipboard.copy(this.generatedText);
    this.snackBar.open('Copied to clipboard', 'Close', { duration: 2000 });
  }
}
