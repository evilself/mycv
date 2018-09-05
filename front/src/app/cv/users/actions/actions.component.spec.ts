import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ActionsComponent } from './actions.component';
import { DebugElement } from '@angular/core';
import { User } from '../users.interfaces';
import { MaterialModule } from '../../../material.module';

export const testUser = {
  id: 0,
  dateOfBirth: '2010-10-10',
  email: 'test@test.com',
  firstName: 'test',
  lastName: 'test'
};

describe('ActionsComponent', () => {
  let component: ActionsComponent;
  let fixture: ComponentFixture<ActionsComponent>;
  let buttons: DebugElement[];
  let editBtn: DebugElement;
  let deleteBtn: DebugElement;
  let addBtn: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule],
      declarations: [ActionsComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionsComponent);
    component = fixture.componentInstance;
    component.data = testUser;
    buttons = fixture.debugElement.queryAll(By.css('button'));
    addBtn = buttons[0];
    fixture.detectChanges();
  });

  it('should create ActionsComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should have only add button on init', () => {
    expect(buttons.length).toBe(1);
    expect(addBtn).toBeDefined();
    expect(addBtn.nativeElement.textContent).toContain('add');
  });

  it('should show edit/delete button on showUserActions', () => {
    component.showUserActions = true;
    fixture.detectChanges();
    buttons = fixture.debugElement.queryAll(By.css('button'));
    editBtn = buttons[0];
    deleteBtn = buttons[1];
    expect(buttons.length).toBe(3);
    expect(editBtn.nativeElement.textContent).toContain('mode_edit');
    expect(deleteBtn.nativeElement.textContent).toContain('delete');
  });

  it('add button should emit undefined on click', () => {
    component.addEditUser.subscribe((value: any) => {
      expect(value).toBeUndefined();
    });
    addBtn.nativeElement.click();
  });

  it('edit button should emit user on click', () => {
    component.showUserActions = true;
    fixture.detectChanges();
    buttons = fixture.debugElement.queryAll(By.css('button'));
    editBtn = buttons[0];
    component.addEditUser.subscribe((value: User | undefined) => {
      expect(value).toBe(testUser);
    });
    editBtn.nativeElement.click();
  });

  it('delete button should emit user on click', () => {
    component.showUserActions = true;
    fixture.detectChanges();
    buttons = fixture.debugElement.queryAll(By.css('button'));
    deleteBtn = buttons[1];
    component.deleteUser.subscribe((value: User | undefined) => {
      expect(value).toBe(testUser);
    });
    deleteBtn.nativeElement.click();
  });
});
