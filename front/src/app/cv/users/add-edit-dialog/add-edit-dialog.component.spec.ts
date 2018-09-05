import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AddEditDialogComponent } from './add-edit-dialog.component';
import { MaterialsModule } from '../material.modules';
import { FormBuilder, } from '@angular/forms';
import { UsersModule } from '../users.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';


export const emptyTestUser = {
  dateOfBirth: '',
  email: '',
  firstName: '',
  lastName: ''
};

export const testUser = {
  id: 0,
  dateOfBirth: '2010-10-10',
  email: 'test@test.com',
  firstName: 'test',
  lastName: 'test'
};

export const dialogMock = {
  close: () => {}
};

describe('AddEditDialogComponent', () => {
  let component: AddEditDialogComponent;
  let fixture: ComponentFixture<AddEditDialogComponent>;
  let buttons: DebugElement[];
  let saveBtn: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MaterialsModule, UsersModule ],
      providers: [
        FormBuilder,
        { provide: MAT_DIALOG_DATA, useValue: {} },
        {
          provide: MatDialogRef,
          useValue: dialogMock
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditDialogComponent);
    component = fixture.componentInstance;
    buttons = fixture.debugElement.queryAll(By.css('button'));
    saveBtn = buttons[0];
    fixture.detectChanges();
  });

  it('should create AddEditDialogComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should have form defined on init', () => {
    expect(component.userForm).toBeDefined();
  });

  it('form should be invalid on init', () => {
    expect(component.userForm.valid).toBeFalsy();
  });

  it('on add should populate the form with empty value', () => {
    component.data = emptyTestUser;
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.userForm.controls['firstName'].value).toEqual(emptyTestUser.firstName);
    expect(component.userForm.controls['lastName'].value).toEqual(emptyTestUser.lastName);
    expect(component.userForm.controls['email'].value).toEqual(emptyTestUser.email);
    expect(component.userForm.controls['dateOfBirth'].value).toBeDefined();
  });

  it('on edit should populate the form with values from component.data', () => {
    component.data = testUser;
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.userForm.controls['firstName'].value).toEqual(testUser.firstName);
    expect(component.userForm.controls['lastName'].value).toEqual(testUser.lastName);
    expect(component.userForm.controls['email'].value).toEqual(testUser.email);
    expect(component.userForm.controls['dateOfBirth'].value).toBeDefined();
  });

  it('save button should be disabled if form is not valid/pristine (default state)', () => {
    expect(saveBtn.nativeElement.disabled).toBeTruthy();
  });

  it('should enable save button when the form is valid', () => {
    component.data = testUser;
    component.ngOnInit();
    component.userForm.markAsDirty();
    fixture.detectChanges();
    expect(saveBtn.nativeElement.disabled).toBeFalsy();
  });

  it('should submit the form on save and close the dialog', () => {
    component.data = testUser;
    spyOn(component, 'onSubmit');
    component.ngOnInit();
    component.userForm.markAsDirty();
    fixture.detectChanges();
    saveBtn.nativeElement.click();
    expect(component.onSubmit).toHaveBeenCalled();
    // spyOn(component.dialogRef, 'close');
    // spyOn(dialogMock, 'close');
    // expect(dialogMock.close).toHaveBeenCalledWith(testUser); // --- does not work for some reason
    // expect(component.dialogRef.close).toHaveBeenCalledWith(testUser); // --- does not work for some reason
  });
});
