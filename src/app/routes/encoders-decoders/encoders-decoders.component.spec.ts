import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { PageHeaderComponent } from '@shared';

import { EncodersDecodersEncodersDecodersComponent } from './encoders-decoders.component';

describe('EncodersDecodersEncodersDecodersComponent', () => {
  let component: EncodersDecodersEncodersDecodersComponent;
  let fixture: ComponentFixture<EncodersDecodersEncodersDecodersComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, PageHeaderComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EncodersDecodersEncodersDecodersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
