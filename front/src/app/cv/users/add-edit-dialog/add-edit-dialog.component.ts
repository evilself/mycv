import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { User } from '../users.interfaces';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

// import { MomentDateAdapter } from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE
} from '@angular/material/core';

// import * as moment from 'moment';
// export const MY_FORMATS = {
//   parse: {
//     dateInput: 'YYYY-MM-DD',
//   },
//   display: {
//     dateInput: 'YYYY-MM-DD',
//     monthYearLabel: 'MMM YYYY',
//     dateA11yLabel: 'YYYY-MM-DD',
//     monthYearA11yLabel: 'MMMM YYYY',
//   },
// };

@Component({
  selector: 'app-add-edit-dialog',
  templateUrl: './add-edit-dialog.component.html',
  styleUrls: ['./add-edit-dialog.component.scss']
  // providers: [
  //   {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
  //   {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  // ],
})
export class AddEditDialogComponent implements OnInit {
  public userForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User
  ) {}

  ngOnInit() {
    this.userForm = this.fb.group({
      id: [this.data.id],
      firstName: [
        this.data.firstName,
        [Validators.required, Validators.minLength(2), Validators.maxLength(20)]
      ],
      lastName: [
        this.data.lastName,
        [Validators.required, Validators.minLength(2), Validators.maxLength(20)]
      ],
      email: [this.data.email, [Validators.required, Validators.email]],
      // dateOfBirth: [moment(this.data.dateOfBirth), Validators.required],
      dateOfBirth: [this.data.dateOfBirth, Validators.required]
    });
  }

  onSubmit(formData: User) {
    // formData.dateOfBirth = moment(formData.dateOfBirth).format('YYYY-MM-DD');

    this.dialogRef.close(formData);
  }
}
