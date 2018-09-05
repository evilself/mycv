import { Component, AfterViewInit } from '@angular/core';
import { UsersService } from './users.service';
import {
  MatTableDataSource,
  MatDialog,
  Sort,
  MatSnackBar
} from '@angular/material';
import { Observable, BehaviorSubject, combineLatest, of } from 'rxjs';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { User, GetUsersResponse, UserRow } from './users.interfaces';
import { AddEditDialogComponent } from './add-edit-dialog/add-edit-dialog.component';
import {
  filter,
  switchMap,
  tap,
  delay,
  share,
  catchError
} from 'rxjs/operators';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements AfterViewInit {
  private newUser: User = {
    firstName: '',
    lastName: '',
    email: '',
    dateOfBirth: ''
  };
  public page$ = new BehaviorSubject(0);
  public size$ = new BehaviorSubject(5);
  private sorting$ = new BehaviorSubject('firstName,desc');
  public isLoading$ = new BehaviorSubject(false);
  private resetQ$ = new BehaviorSubject(0);
  public showUserActions$ = new BehaviorSubject(false);
  public selectedUser$ = new BehaviorSubject(this.newUser);
  public query$ = combineLatest(
    this.page$,
    this.size$,
    this.sorting$,
    this.resetQ$
  ).pipe(
    tap(() => {
      this.isLoading$.next(true);
    }),
    delay(500),
    switchMap(
      ([page, size, sorting]) => this.usersService.getAll(page, size, sorting)
      // .pipe(catchError(err => of(err)))
    ),
    tap(aa => {
      console.log(aa);
    }),
    share()
  );

  public displayedColumns = ['firstName', 'lastName', 'email', 'dateOfBirth'];
  public dataSource = new MatTableDataSource();

  constructor(
    private usersService: UsersService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    console.log('iiniit');
  }

  ngAfterViewInit() {
    this.query$.subscribe((data: GetUsersResponse) => {
      if (data.content) {
        this.dataSource.data = data.content;
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

  selectRow(data: UserRow) {
    data.active = !data.active;
    this.selectedUser$.next(data);
    this.showUserActions$.next(data.active);

    this.dataSource.data.map((row: UserRow) => {
      if (!(data.id === row.id)) {
        row.active = false;
      }
    });
  }

  confirmDeleteDialog(data: User) {
    const deleteDialogRef = this.dialog.open(DeleteDialogComponent, {
      data: data.id
    });

    deleteDialogRef
      .afterClosed()
      .pipe(
        filter(result => result),
        switchMap(() => this.usersService.deleteUser(data))
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

  openAddEditDialog(data: User = this.newUser) {
    const addEditDialogRef = this.dialog.open(AddEditDialogComponent, {
      width: '400px',
      data: data
    });

    addEditDialogRef
      .afterClosed()
      .pipe(
        filter(formData => formData),
        switchMap(
          (formData: User) =>
            formData.id
              ? this.usersService.updateUser(formData)
              : this.usersService.addUser(formData)
        )
      )
      .subscribe(
        (payload: UserRow) => {
          this.snackBar.open(`${payload.opType} user #${payload.id}`, '', {
            duration: 2000
          });
          this.resetQ$.next(1);
        },
        () => {
          this.snackBar.open(
            `There was an error when trying to add/edit this user`,
            '',
            {
              duration: 2000
            }
          );
        }
      );
  }
}
