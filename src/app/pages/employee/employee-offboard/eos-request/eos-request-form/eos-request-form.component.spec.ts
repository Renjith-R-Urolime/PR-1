import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EosRequestFormComponent } from './eos-request-form.component';

describe('EosRequestFormComponent', () => {
  let component: EosRequestFormComponent;
  let fixture: ComponentFixture<EosRequestFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EosRequestFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EosRequestFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
