import { NgModule } from '@angular/core';
import { MyCVComponent } from './mycv.component';
import { MaterialModule } from '../material.module';

@NgModule({
  imports: [MaterialModule],
  declarations: [MyCVComponent]
})
export class MyCVModule {}
