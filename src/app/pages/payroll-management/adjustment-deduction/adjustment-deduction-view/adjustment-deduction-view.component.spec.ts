/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AdjustmentDeductionViewComponent } from './adjustment-deduction-view.component';



describe('AdjustmentDeductionViewComponent', () => {
  let component: AdjustmentDeductionViewComponent;
  let fixture: ComponentFixture<AdjustmentDeductionViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdjustmentDeductionViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdjustmentDeductionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
