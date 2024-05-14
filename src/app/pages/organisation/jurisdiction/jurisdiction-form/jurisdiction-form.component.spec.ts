import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JurisdictionFormComponent } from './jurisdiction-form.component';

describe('JurisdictionFormComponent', () => {
  let component: JurisdictionFormComponent;
  let fixture: ComponentFixture<JurisdictionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JurisdictionFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JurisdictionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
