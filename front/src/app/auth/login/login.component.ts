import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loading = false;
  public loginForm: FormGroup;

  constructor(
    private auth: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    // if (this.auth.hasToken()) {
    //   this.router.navigate(['cv/my']);
    // }

    this.buildForm();
  }

  login(form: FormGroup): void {
    this.loading = true;
    this.auth
      .login({
        username: form.value['username'],
        password: form.value['password']
      })
      .subscribe(
        () => {
          this.router.navigate(['/cv/my']);
        },
        err => {
          this.snackBar.open(JSON.parse(err._body).error_description, '', {
            duration: 4000
          });
          this.loading = false;
        }
      );
  }

  buildForm(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.maxLength(25)]]
    });
  }
}
