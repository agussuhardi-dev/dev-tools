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
import { NgForOf, NgIf } from '@angular/common';
import { Clipboard } from '@angular/cdk/clipboard';
import { MatTooltip } from '@angular/material/tooltip';
import { MatOption, MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-encoders-decoders-jwt',
  templateUrl: './jwt.component.html',
  styleUrls: ['./jwt.component.scss'],
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
    FormsModule,
    NgIf,
    MatSnackBarModule,
    MatTooltip,
    MatSelect,
    MatOption,
    NgForOf,
  ],
})
export class EncodersDecodersJwtComponent {
  inputText: string = '';
  outputJwt: string = '';
  decodedHeader: string = '';
  decodedPayload: string = '';
  errorMessage: string = '';
  selectedOperation: 'encode' | 'decode' = 'encode';
  signatureValid: boolean = false;
  secretKey: string = '';
  selectedAlgorithm: string = 'HS256';

  algorithms: string[] = [
    'HS256',
    'HS384',
    'HS512',
    'RS256',
    'RS384',
    'RS512',
    'ES256',
    'ES384',
    'ES512',
  ];

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
    this.outputJwt = '';
    this.decodedHeader = '';
    this.decodedPayload = '';
    this.errorMessage = '';
    this.signatureValid = false;
    this.secretKey = '';
    this.selectedAlgorithm = 'HS256';
    this.snackBar.open('All fields cleared', 'Close', {
      duration: 2000,
    });
  }

  public convert() {
    this.errorMessage = '';
    this.outputJwt = '';
    this.decodedHeader = '';
    this.decodedPayload = '';
    this.signatureValid = false;

    if (this.inputText.trim() === '') {
      return;
    }

    try {
      if (this.selectedOperation === 'encode') {
        this.outputJwt = this.encodeJWT(this.inputText, this.secretKey, this.selectedAlgorithm);
      } else {
        const decoded = this.decodeJWT(this.inputText, this.secretKey, this.selectedAlgorithm);
        this.decodedHeader = JSON.stringify(decoded.header, null, 2);
        this.decodedPayload = JSON.stringify(decoded.payload, null, 2);
        this.signatureValid = decoded.signatureValid;
      }
    } catch (error) {
      console.error('Conversion error:', error);
      this.errorMessage = `Error: ${(error as Error).message}`;
    }
  }

  private encodeJWT(input: string, secret: string, algorithm: string): string {
    try {
      const payload = JSON.parse(input);
      const header = { alg: algorithm, typ: 'JWT' };

      const encodedHeader = btoa(JSON.stringify(header));
      const encodedPayload = btoa(JSON.stringify(payload));

      // Note: In a real application, you would use a proper JWT library
      // This is a simplified example and is not secure for production use
      const signature = this.generateSignature(
        `${encodedHeader}.${encodedPayload}`,
        secret,
        algorithm
      );

      return `${encodedHeader}.${encodedPayload}.${signature}`;
    } catch (error) {
      throw new Error('Invalid JSON input');
    }
  }

  private decodeJWT(
    token: string,
    secret: string,
    algorithm: string
  ): { header: any; payload: any; signatureValid: boolean } {
    try {
      const [headerB64, payloadB64, signature] = token.split('.');

      const header = JSON.parse(atob(headerB64));
      const payload = JSON.parse(atob(payloadB64));

      // Verify the signature
      const signatureValid = this.verifySignature(
        `${headerB64}.${payloadB64}`,
        signature,
        secret,
        algorithm
      );

      return { header, payload, signatureValid };
    } catch (error) {
      throw new Error('Invalid JWT format');
    }
  }

  private generateSignature(data: string, secret: string, algorithm: string): string {
    // This is a placeholder for signature generation
    // In a real application, use a proper cryptographic library
    return btoa(data + secret + algorithm);
  }

  private verifySignature(
    data: string,
    signature: string,
    secret: string,
    algorithm: string
  ): boolean {
    // This is a placeholder for signature verification
    // In a real application, use a proper cryptographic library
    return signature === btoa(data + secret + algorithm);
  }
}
