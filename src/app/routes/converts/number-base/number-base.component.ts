import { Component, OnInit } from '@angular/core';
import { BreadcrumbComponent } from '@shared';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-converts-number-base',
  templateUrl: './number-base.component.html',
  styleUrl: './number-base.component.scss',
  standalone: true,
  imports: [
    MatCardModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTabsModule,
    FormsModule,
    BreadcrumbComponent,
  ],
})
export class ConvertsNumberBaseComponent implements OnInit {
  decimalValue = '';
  hexValue = '';
  octValue = '';

  private _binValue = '';

  get binValue(): string {
    return this._binValue;
  }

  set binValue(value: string) {
    this._binValue = value;
  }

  ngOnInit(): void {}

  convertDecimal(): void {
    const decimal = parseInt(this.decimalValue, 10);
    this.hexValue = decimal.toString(16);
    this.octValue = decimal.toString(8);
    this._binValue = decimal.toString(2);
  }

  convertHex(): void {
    const hex = parseInt(this.hexValue, 16);
    this.decimalValue = hex.toString(10);
    this.octValue = hex.toString(8);
    this._binValue = hex.toString(2);
  }

  convertOct(): void {
    const oct = parseInt(this.octValue, 8);
    this.decimalValue = oct.toString(10);
    this.hexValue = oct.toString(16);
    this._binValue = oct.toString(2);
  }

  convertBin(): void {
    const bin = parseInt(this._binValue, 2);
    this.decimalValue = bin.toString(10);
    this.hexValue = bin.toString(16);
    this.octValue = bin.toString(8);
  }
}
