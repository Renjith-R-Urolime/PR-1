import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelsFormComponent } from './travels-form.component';

describe('TravelsFormComponent', () => {
  let component: TravelsFormComponent;
  let fixture: ComponentFixture<TravelsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TravelsFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TravelsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
