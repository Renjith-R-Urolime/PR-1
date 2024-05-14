import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartsOfAccountsViewComponent } from './charts-of-accounts-view.component';

describe('ChartsOfAccountsViewComponent', () => {
  let component: ChartsOfAccountsViewComponent;
  let fixture: ComponentFixture<ChartsOfAccountsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartsOfAccountsViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartsOfAccountsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
