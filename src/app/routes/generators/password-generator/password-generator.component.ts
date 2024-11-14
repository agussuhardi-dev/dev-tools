import { Component, OnInit } from '@angular/core';
import { BreadcrumbComponent } from '@shared';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-generators-password-generator',
  templateUrl: './password-generator.component.html',
  styleUrls: ['./password-generator.component.scss'],
  standalone: true,
  imports: [
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
    NgIf,
    BreadcrumbComponent,
  ],
})
export class GeneratorsPasswordGeneratorComponent implements OnInit {
  passwordForm: FormGroup;
  generatedPassword: string = '';

  constructor(private fb: FormBuilder) {
    this.passwordForm = this.fb.group({
      length: [8, [Validators.required, Validators.min(1)]],
      includeLowercase: [true],
      includeUppercase: [true],
      includeSpecial: [true],
      excludeCharacters: [''],
    });
  }

  ngOnInit() {}

  generatePassword() {
    const { length, includeLowercase, includeUppercase, includeSpecial, excludeCharacters } =
      this.passwordForm.value;
    let characters = '';
    if (includeLowercase) characters += 'abcdefghijklmnopqrstuvwxyz';
    if (includeUppercase) characters += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeSpecial) characters += '!@#$%^&*()-_=+[]{}|;:,.<>?';

    // Remove excluded characters
    const excludeSet = new Set(excludeCharacters.split(''));
    characters = [...characters].filter(char => !excludeSet.has(char)).join('');

    let password = '';
    for (let i = 0; i < length; i++) {
      password += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    this.generatedPassword = password;
  }
}
