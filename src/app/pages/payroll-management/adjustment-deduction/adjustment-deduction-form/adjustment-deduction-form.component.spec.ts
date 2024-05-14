/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AdjustmentDeductionFormComponent } from './adjustment-deduction-form.component';



describe('AdjustmentDeductionFormComponent', () => {
  let component: AdjustmentDeductionFormComponent;
  let fixture: ComponentFixture<AdjustmentDeductionFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdjustmentDeductionFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdjustmentDeductionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
