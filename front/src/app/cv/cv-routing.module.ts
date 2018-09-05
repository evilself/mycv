import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllComponent } from './all/all.component';
import { MyComponent } from './my/my.component';
import { PreviewComponent } from './preview/preview.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'my',
    pathMatch: 'full'
  },
  {
    path: 'all',
    component: AllComponent
  },
  {
    path: 'my',
    component: MyComponent
  },
  {
    path: 'preview',
    component: PreviewComponent
  },
  {
    path: 'users',
    component: UsersComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CvRoutingModule {}
