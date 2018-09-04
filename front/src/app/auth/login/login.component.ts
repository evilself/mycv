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
    if (this.auth.isAuthenticated) {
      this.router.navigate(['']);
    }

    this.buildForm();
  }

  login(form: FormGroup): void {
    this.loading = true;
    this.auth
      .login(form.value['email'], form.value['password'])
      .then(() => {
        this.router.navigate(['/cv/my']);
      })
      .catch(error => {
        this.snackBar.open(error.message, '', {
          duration: 4000
        });
        this.loading = false;
      });
  }

  buildForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [Validators.required, Validators.minLength(6), Validators.maxLength(25)]
      ]
    });
  }
}
