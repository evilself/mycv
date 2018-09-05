import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersComponent } from './users.component';
import { UsersService } from './users.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { UsersModule } from './users.module';
import { By } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';
import { fakeGetAll } from './users.service.spec';
import 'rxjs/add/observable/of';
import { DebugElement } from '@angular/core';
import { MaterialModule } from '../../material.module';

export const dialogMock = {
  open: () => {},
  close: () => {}
};

const userServiceStub = {
  getAll: () => of(fakeGetAll()),
  getById: () => {},
  addUser: () => {},
  updateUser: () => {},
  deleteUser: () => {}
};

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  let progressBarEl: DebugElement;
  let searchInput: DebugElement;
  let tableEl: DebugElement;
  let appActions: DebugElement;
  let appPaginator: DebugElement;
  let tableRows: DebugElement[];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule, UsersModule],
      providers: [
        { provide: UsersService, useValue: userServiceStub },
        { provide: MatDialog, useValue: dialogMock },
        { provide: MatSnackBar, useValue: {} }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    progressBarEl = fixture.debugElement.query(By.css('mat-progress-bar'));
    searchInput = fixture.debugElement.query(By.css('input'));
    tableEl = fixture.debugElement.query(By.css('mat-table'));
    appActions = fixture.debugElement.query(By.css('app-actions'));
    appPaginator = fixture.debugElement.query(By.css('app-paginator'));
    fixture.detectChanges();
  });

  it('should create UsersComponent', () => {
    expect(component).toBeTruthy();
  });

  describe('search input', () => {
    it('should have input field for search', () => {
      expect(searchInput).toBeTruthy();
      expect(searchInput.attributes['placeholder']).toContain('Search');
    });
  });

  describe('progress bar', () => {
    it('should have progress bar', () => {
      expect(progressBarEl).toBeTruthy();
    });

    it('progressbar should be visible when loading content', () => {
      component.isLoading$.next(true);
      fixture.detectChanges();
      expect(progressBarEl.styles.opacity).toBe('1');
    });

    it('progressbar should be hidden when done', () => {
      component.isLoading$.next(false);
      fixture.detectChanges();
      expect(progressBarEl.styles.opacity).toBe('0');
    });
  });

  describe('users table', () => {
    it('should have mat-table for users', () => {
      expect(tableEl).toBeTruthy();
    });

    it('should have 4 columns', () => {
      expect(tableEl.children[0].name).toBe('mat-header-row');
      expect(tableEl.children[0].children.length).toBe(4);
    });

    it('should have first name column', () => {
      expect(tableEl.children[0].children[0].nativeElement.textContent).toBe(
        'First Name'
      );
    });

    it('should have last name column', () => {
      expect(tableEl.children[0].children[1].nativeElement.textContent).toBe(
        'Last Name'
      );
    });

    it('should have email column', () => {
      expect(tableEl.children[0].children[2].nativeElement.textContent).toBe(
        'Email'
      );
    });

    it('should have date of birth column', () => {
      expect(tableEl.children[0].children[3].nativeElement.textContent).toBe(
        'Date of birth'
      );
    });

    it(`should have a row for every user (${
      fakeGetAll().content.length
    } test users)`, (done: DoneFn) => {
      component.query$.subscribe(() => {
        fixture.detectChanges();
        tableRows = fixture.debugElement.queryAll(By.css('mat-row'));
        expect(tableRows.length).toBe(fakeGetAll().content.length);
        done();
      });
    });

    it(`clicking on a row should select the user`, (done: DoneFn) => {
      spyOn(component, 'selectRow');
      component.query$.subscribe(() => {
        fixture.detectChanges();
        tableRows = fixture.debugElement.queryAll(By.css('mat-row'));
        tableRows[0].triggerEventHandler('click', null);
        fixture.detectChanges();
        expect(component.selectRow).toHaveBeenCalledWith(
          fakeGetAll().content[0]
        );
        done();
      });
    });
  });

  describe('action buttons', () => {
    it('should have app-actions component', () => {
      expect(appActions).toBeTruthy();
    });

    it('should open add dialog', () => {
      spyOn(component, 'openAddEditDialog');
      expect(appActions.children[0].nativeElement.textContent).toContain('add');
      appActions.children[0].triggerEventHandler('click', null);
      fixture.detectChanges();
      expect(component.openAddEditDialog).toHaveBeenCalledWith(undefined);
    });

    it('should open edit dialog', () => {
      spyOn(component, 'openAddEditDialog');
      component.showUserActions$.next(true);
      component.selectedUser$.next(fakeGetAll().content[0]);
      fixture.detectChanges();
      expect(
        appActions.children[0].children[0].nativeElement.textContent
      ).toContain('edit');
      appActions.children[0].children[0].triggerEventHandler('click', null);
      fixture.detectChanges();
      expect(component.openAddEditDialog).toHaveBeenCalledWith(
        fakeGetAll().content[0]
      );
    });

    it('should open confirm delete dialog', () => {
      spyOn(component, 'confirmDeleteDialog');
      component.showUserActions$.next(true);
      component.selectedUser$.next(fakeGetAll().content[0]);
      fixture.detectChanges();
      expect(
        appActions.children[0].children[1].nativeElement.textContent
      ).toContain('delete');
      appActions.children[0].children[1].triggerEventHandler('click', null);
      fixture.detectChanges();
      expect(component.confirmDeleteDialog).toHaveBeenCalledWith(
        fakeGetAll().content[0]
      );
    });
  });

  describe('paginator', () => {
    it('should have app-paginator component', () => {
      expect(appPaginator).toBeTruthy();
    });
  });
});
