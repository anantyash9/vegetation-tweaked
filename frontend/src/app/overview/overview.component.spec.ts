import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { overviewComponent } from './overview.component';

describe('overviewComponent', () => {
  let component: overviewComponent;
  let fixture: ComponentFixture<overviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ overviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(overviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
