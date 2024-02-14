import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeclineListComponent } from './decline-list.component';

describe('DeclineListComponent', () => {
  let component: DeclineListComponent;
  let fixture: ComponentFixture<DeclineListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeclineListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeclineListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
