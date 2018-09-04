import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllComponent } from './all/all.component';
import { MyComponent } from './my/my.component';
import { PreviewComponent } from './preview/preview.component';
import { CvRoutingModule } from './cv-routing.module';
import { MaterialModule } from '../material.module';

@NgModule({
  imports: [CommonModule, CvRoutingModule, MaterialModule],
  declarations: [AllComponent, MyComponent, PreviewComponent]
})
export class CvModule {}
