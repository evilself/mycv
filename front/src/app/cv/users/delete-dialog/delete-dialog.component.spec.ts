import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDialogComponent } from './delete-dialog.component';
import { MaterialsModule } from '../material.modules';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('DeleteDialogComponent', () => {
  let component: DeleteDialogComponent;
  let fixture: ComponentFixture<DeleteDialogComponent>;
  let buttons: DebugElement[];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MaterialsModule ],
      declarations: [ DeleteDialogComponent ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteDialogComponent);
    component = fixture.componentInstance;
    buttons = fixture.debugElement.queryAll(By.css('button'));
    component.id = 0;
    fixture.detectChanges();
  });

  it('should create DeleteDialogComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should have Yes/No buttons', () => {
    expect(buttons.length).toBe(2);
    expect(buttons[0].nativeElement.textContent).toBe('Yes');
    expect(buttons[1].nativeElement.textContent).toBe('No');
  });
});
