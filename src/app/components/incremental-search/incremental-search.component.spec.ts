import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncrementalSearchComponent } from './incremental-search.component';

describe('IncrementalSearchComponent', () => {
  let component: IncrementalSearchComponent;
  let fixture: ComponentFixture<IncrementalSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncrementalSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncrementalSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
