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
          this.snackBar.open('There was an error while logging in', '', {
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
