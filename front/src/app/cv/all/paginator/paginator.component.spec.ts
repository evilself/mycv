import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginatorComponent } from './paginator.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { MaterialModule } from '../../../material.module';

describe('PaginatorComponent', () => {
  let component: PaginatorComponent;
  let fixture: ComponentFixture<PaginatorComponent>;
  let buttons: DebugElement[];
  let nextBtn: DebugElement;
  let prevBtn: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule, BrowserAnimationsModule],
      declarations: [PaginatorComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginatorComponent);
    component = fixture.componentInstance;
    buttons = fixture.debugElement.queryAll(By.css('button'));
    prevBtn = buttons[0];
    nextBtn = buttons[1];
    component.currentPage = 0;
    component.pageSize = 5;
    component.totalPages = 3;
    fixture.detectChanges();
  });

  it('should create PaginatorComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should have mat-select', () => {
    expect(fixture.debugElement.query(By.css('mat-select'))).toBeTruthy();
  });

  it('should have an element that shows the current page', () => {
    const pageInfo = fixture.debugElement.query(By.css('.page-info'));
    expect(pageInfo).toBeDefined();
    expect(pageInfo.nativeElement.textContent).toBe(
      `Page ${component.currentPage + 1} of ${component.totalPages}`
    );
  });

  it('should have two buttons for prev/next page', () => {
    expect(prevBtn.nativeElement.textContent).toContain('keyboard_arrow_left');
    expect(nextBtn.nativeElement.textContent).toContain('keyboard_arrow_right');
  });

  it('prevBtn should be disabled on the first page', () => {
    expect(prevBtn.nativeElement.disabled).toBeTruthy();
  });

  it('nextBtn should be disabled on the last page', () => {
    component.currentPage = component.totalPages - 1; // paging starts from 0, total page count starts from 1
    fixture.detectChanges();
    expect(nextBtn.nativeElement.disabled).toBeTruthy();
  });

  it('prevBtn should emit the number of the previous page on click', () => {
    component.nextPage.subscribe((value: number) => {
      expect(value).toBe(component.currentPage - 1);
    });
    prevBtn.nativeElement.click();
  });

  it('nextBtn should emit the number of the next page on click', () => {
    component.nextPage.subscribe((value: number) => {
      expect(value).toBe(component.currentPage + 1);
    });
    nextBtn.nativeElement.click();
  });
});
