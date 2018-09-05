import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { UsersService } from './users.service';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { PaginatorComponent } from './paginator/paginator.component';
import { ActionsComponent } from './actions/actions.component';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { AddEditDialogComponent } from './add-edit-dialog/add-edit-dialog.component';
import { MaterialModule } from '../../material.module';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  declarations: [
    UsersComponent,
    PaginatorComponent,
    ActionsComponent,
    DeleteDialogComponent,
    AddEditDialogComponent
  ],
  providers: [UsersService],
  entryComponents: [DeleteDialogComponent, AddEditDialogComponent]
})
export class UsersModule {}
