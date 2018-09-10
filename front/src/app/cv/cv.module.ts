import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AllComponent } from './all/all.component';
import { DeleteDialogComponent } from './all/delete-dialog/delete-dialog.component';
import { PaginatorComponent } from './all/paginator/paginator.component';
import { ActionsComponent } from './all/actions/actions.component';
import { CVsService } from './cv.service';
import { MyComponent } from './my/my.component';
import { PreviewComponent } from './preview/preview.component';
import { CvRoutingModule } from './cv-routing.module';
import { MaterialModule } from '../material.module';
import { UsersModule } from './users/users.module';

@NgModule({
  imports: [CommonModule, CvRoutingModule, MaterialModule, HttpClientModule],
  providers: [CVsService],
  declarations: [AllComponent, MyComponent, PreviewComponent, ActionsComponent, DeleteDialogComponent, PaginatorComponent],
  entryComponents: [DeleteDialogComponent]
})
export class CvModule {}
