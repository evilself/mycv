import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllCVComponent } from './allcv/allcv.component';
import { MyCVComponent } from './mycv/mycv.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'mycv',
    pathMatch: 'full'
  },
  {
    path: 'allcv',
    component: AllCVComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'mycv',
    component: MyCVComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
