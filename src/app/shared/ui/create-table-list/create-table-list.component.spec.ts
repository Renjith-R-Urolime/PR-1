import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTableListComponent } from './create-table-list.component';

describe('CreateTableListComponent', () => {
  let component: CreateTableListComponent;
  let fixture: ComponentFixture<CreateTableListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateTableListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateTableListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
