import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCVComponent } from './mycv.component';

describe('MycvComponent', () => {
  let component: MyCVComponent;
  let fixture: ComponentFixture<MyCVComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MyCVComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCVComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
