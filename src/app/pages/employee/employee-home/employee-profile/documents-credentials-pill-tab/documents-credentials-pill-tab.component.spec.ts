import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentsCredentialsPillTabComponent } from './documents-credentials-pill-tab.component';

describe('DocumentsCredentialsPillTabComponent', () => {
  let component: DocumentsCredentialsPillTabComponent;
  let fixture: ComponentFixture<DocumentsCredentialsPillTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentsCredentialsPillTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentsCredentialsPillTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
