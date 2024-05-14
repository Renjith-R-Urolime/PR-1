import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EosSubTypeComponent } from './eos-sub-type.component';

describe('EosSubTypeComponent', () => {
  let component: EosSubTypeComponent;
  let fixture: ComponentFixture<EosSubTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EosSubTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EosSubTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
