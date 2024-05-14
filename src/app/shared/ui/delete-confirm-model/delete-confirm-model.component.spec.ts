import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteConfirmModelComponent } from './delete-confirm-model.component';

describe('DeleteConfirmModelComponent', () => {
  let component: DeleteConfirmModelComponent;
  let fixture: ComponentFixture<DeleteConfirmModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteConfirmModelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteConfirmModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
