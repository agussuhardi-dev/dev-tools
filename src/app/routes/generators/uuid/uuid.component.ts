import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions, MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Clipboard } from '@angular/cdk/clipboard';
import { v1, v4, v5, NIL as NIL_UUID, v3, v6, v7 } from 'uuid';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { BreadcrumbComponent, PageHeaderComponent } from '@shared';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'app-generators-uuid',
  templateUrl: './uuid.component.html',
  styleUrls: ['./uuid.component.scss'],
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
    MatTooltip,
  ],
})
export class GeneratorsUuidComponent {
  uuidVersion: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' = '4';
  totalRows = 1;
  outputUuids = '';
  namespaceInput = '019323af-8b93-779c-a490-aad650857f2e';
  nameInput = 'dev-tools';
  uuidInfo = {
    '1': 'UUID v1: Based on timestamp and MAC address',
    '2': 'UUID v2: Based on timestamp, MAC address, and POSIX UID/GID',
    '3': 'UUID v3: Based on namespace and name (MD5)',
    '4': 'UUID v4: Random',
    '5': 'UUID v5: Based on namespace and name (SHA-1)',
    '6': 'UUID v6: Based on timestamp and random data',
    '7': 'UUID v7: Based on Unix timestamp and random data',
    '8': 'UUID v8: Custom (vendor-specific)',
  }

  constructor(
    private clipboard: Clipboard,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  generateUuids() {
    if (this.uuidVersion === '8') {
      this.outputUuids = this.uuidInfo['8'];
      return;
    }
    const uuids = [];
    for (let i = 0; i < this.totalRows; i++) {
      uuids.push(this.generateUuid(this.uuidVersion));
    }
    this.outputUuids = uuids.join('\n');
  }

  generateUuid(version: string): string {
    switch (version) {
      case '1':
        return v1();
      case '2':
        return this.generateV2UUID();
      case '3':
        return this.generateV3UUID();
      case '4':
        return v4();
      case '5':
        return this.generateV5UUID(this.namespaceInput, this.nameInput);
      case '6':
        return this.generateV6UUID();
      case '7':
        return this.generateV7UUID();
      case '8':
        return this.generateV8UUID();
      default:
        return v4();
    }
  }

  private generateV2UUID(): string {
    // Implement V2 UUID generation or use a library
    // Example implementation (actual implementation may vary)
    const timestamp = Date.now();
    const macAddress = '00:0a:95:9d:68:16'; // Example MAC address
    const posixUid = 1000; // Example POSIX UID
    const posixGid = 1000; // Example POSIX GID
    return `${timestamp}-${macAddress}-${posixUid}-${posixGid}`;
  }

  private generateV3UUID(): string {
    if (!this.namespaceInput || !this.nameInput) {
      throw new Error('Namespace and name are required for UUID v3');
    }
    return v3(this.nameInput, this.namespaceInput);
  }

  private generateV5UUID(namespace?: string, name?: string): string {
    if (namespace === undefined) {
      throw new Error('Namespace is required');
    }
    if (name === undefined) {
      throw new Error('Name is required');
    }
    return v5(name, namespace);
  }

  private generateV6UUID(): string {
    return v6();
  }

  private generateV7UUID(): string {
    return v7();
  }

  private generateV8UUID(): string {
    return 'V8 UUID not implemented';
  }

  isGenerateButtonDisabled(): boolean {
    return this.uuidVersion === '2' || this.uuidVersion === '8';
  }

  copyToClipboard() {
    this.clipboard.copy(this.outputUuids);
    this.snackBar.open('Copied to clipboard', 'Close', {
      duration: 2000,
    });
  }

  showUuidInfo(version: keyof typeof this.uuidInfo) {
    this.dialog.open(UuidInfoDialogComponent, {
      data: { version, info: this.uuidInfo[version] },
      width: '400px',
    });
  }
}

@Component({
  selector: 'app-uuid-info-dialog',
  template: `
    <h1 mat-dialog-title>UUID Information</h1>
    <div mat-dialog-content>
      <p>{{ data.info }}</p>
    </div>
    <div mat-dialog-actions>
      <button mat-button mat-dialog-close>Close</button>
    </div>
  `,
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatButton, MatDialogClose],
})
export class UuidInfoDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { version: string; info: string }) {}
}
