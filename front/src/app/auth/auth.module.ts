import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

@NgModule({
  imports: [CommonModule],
  declarations: [LoginComponent],
  providers: [AuthGuard, AuthService]
})
export class AuthModule {}
