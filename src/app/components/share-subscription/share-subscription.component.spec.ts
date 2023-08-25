import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareSubscriptionComponent } from './share-subscription.component';

describe('ShareSubscriptionComponent', () => {
  let component: ShareSubscriptionComponent;
  let fixture: ComponentFixture<ShareSubscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShareSubscriptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShareSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
