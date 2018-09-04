import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllCVComponent } from './allcv.component';

describe('AllcvComponent', () => {
  let component: AllCVComponent;
  let fixture: ComponentFixture<AllCVComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AllCVComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllCVComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
