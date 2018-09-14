import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  MatTableDataSource,
  MatDialog,
  Sort,
  MatSnackBar
} from '@angular/material';
import { Observable, BehaviorSubject, combineLatest, of } from 'rxjs';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { CVListItem, GetCVsListResponse } from '../cv.interface';
import { CVsService } from '../cv.service';
import {
  filter,
  switchMap,
  tap,
  delay,
  share,
  catchError
} from 'rxjs/operators';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.scss']
})
export class AllComponent implements AfterViewInit {
  private sorting$ = new BehaviorSubject('firstName,desc');
  public isLoading$ = new BehaviorSubject(false);
  private resetQ$ = new BehaviorSubject(0);
  public showUserActions$ = new BehaviorSubject(false);

  public query$ = combineLatest(this.sorting$, this.resetQ$).pipe(
    tap(() => {
      this.isLoading$.next(true);
    }),
    delay(500),
    switchMap(
      ([sorting]) => this.cvsService.getAll(sorting)
      // .pipe(catchError(err => of(err)))
    ),
    tap(aa => {
      console.log(aa);
    }),
    share()
  );

  public displayedColumns = ['firstName', 'lastName', 'actions'];
  public dataSource = new MatTableDataSource();

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private cvsService: CVsService,
    private router: Router
  ) {
    console.log('iiniit');
  }

  ngAfterViewInit() {
    this.query$.subscribe((data: CVListItem[]) => {
      if (data) {
        this.dataSource.data = data;
      } else {
        this.snackBar.open(`There was an error loading the users`, '', {
          duration: 2000
        });
      }

      this.isLoading$.next(false);
      this.showUserActions$.next(false);
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  sortData(sort: Sort) {
    this.sorting$.next(`${sort.active},${sort.direction}`);
  }

  confirmDeleteDialog(data: CVListItem) {
    const deleteDialogRef = this.dialog.open(DeleteDialogComponent, {
      data: data.id
    });

    deleteDialogRef
      .afterClosed()
      .pipe(
        filter(result => result),
        switchMap(() => this.cvsService.delete(data))
      )
      .subscribe(
        () => {
          this.snackBar.open(`Deleted user: #${data.id}`, '', {
            duration: 2000
          });
          this.resetQ$.next(1);
        },
        () => {
          this.snackBar.open(
            `There was an error when trying to delete this user`,
            '',
            {
              duration: 2000
            }
          );
        }
      );
  }

  navigateToAddEdit(data: CVListItem) {

  }

  navigateToPreview(data: CVListItem) {
    this.router.navigate(['cv', 'preview', data.id]);
  }

  generateCVDocument(data: CVListItem) {
    this.cvsService.generateDocument(data).subscribe(result => {
      const url = window.URL.createObjectURL(result);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${data.firstName}_${data.lastName}_CV.docx`;
      link.click();
    });
  }
}
