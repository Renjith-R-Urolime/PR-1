import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EosRequestViewComponent } from './eos-request-view.component';

describe('EosRequestViewComponent', () => {
  let component: EosRequestViewComponent;
  let fixture: ComponentFixture<EosRequestViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EosRequestViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EosRequestViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
