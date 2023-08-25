import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawingCanvaComponent } from './drawing-canva.component';

describe('DrawingCanvaComponent', () => {
  let component: DrawingCanvaComponent;
  let fixture: ComponentFixture<DrawingCanvaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrawingCanvaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrawingCanvaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
