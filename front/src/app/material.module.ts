import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

const MODULES = [
  MatInputModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatNativeDateModule,
  MatButtonModule,
  MatSidenavModule,
  MatToolbarModule,
  MatIconModule
];

@NgModule({
  imports: MODULES,
  exports: MODULES,
  declarations: []
})
export class MaterialModule {}
