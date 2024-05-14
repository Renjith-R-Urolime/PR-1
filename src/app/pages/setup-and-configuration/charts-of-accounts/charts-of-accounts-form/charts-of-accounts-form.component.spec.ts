import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartsOfAccountsFormComponent } from './charts-of-accounts-form.component';

describe('ChartsOfAccountsFormComponent', () => {
  let component: ChartsOfAccountsFormComponent;
  let fixture: ComponentFixture<ChartsOfAccountsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartsOfAccountsFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartsOfAccountsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
