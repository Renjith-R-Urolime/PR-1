import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortcutsWidgetComponent } from './shortcuts-widget.component';

describe('ShortcutsWidgetComponent', () => {
  let component: ShortcutsWidgetComponent;
  let fixture: ComponentFixture<ShortcutsWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShortcutsWidgetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShortcutsWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
