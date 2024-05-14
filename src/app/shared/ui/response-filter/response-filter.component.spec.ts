import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponseFilterComponent } from './response-filter.component';

describe('ResponseFilterComponent', () => {
  let component: ResponseFilterComponent;
  let fixture: ComponentFixture<ResponseFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResponseFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResponseFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
