import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EosRequestComponent } from './eos-request.component';

describe('EosRequestComponent', () => {
  let component: EosRequestComponent;
  let fixture: ComponentFixture<EosRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EosRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EosRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
