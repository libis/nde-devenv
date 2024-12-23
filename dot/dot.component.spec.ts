import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DotComponent } from './dot.component';

describe('DotComponent', () => {
  let component: DotComponent;
  let fixture: ComponentFixture<DotComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DotComponent]
    });
    fixture = TestBed.createComponent(DotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
