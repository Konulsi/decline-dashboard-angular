import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeclineDetailComponent } from './decline-detail.component';

describe('DeclineDetailComponent', () => {
  let component: DeclineDetailComponent;
  let fixture: ComponentFixture<DeclineDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeclineDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeclineDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
