import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarningsViewComponent } from './warnings-view.component';

describe('WarningsViewComponent', () => {
  let component: WarningsViewComponent;
  let fixture: ComponentFixture<WarningsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WarningsViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WarningsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
