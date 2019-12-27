import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NeumaticosSharedModule } from 'app/shared/shared.module';
import { MeasureComponent } from './measure.component';
import { MeasureDetailComponent } from './measure-detail.component';
import { MeasureUpdateComponent } from './measure-update.component';
import { MeasureDeleteDialogComponent } from './measure-delete-dialog.component';
import { measureRoute } from './measure.route';

@NgModule({
  imports: [NeumaticosSharedModule, RouterModule.forChild(measureRoute)],
  declarations: [MeasureComponent, MeasureDetailComponent, MeasureUpdateComponent, MeasureDeleteDialogComponent],
  entryComponents: [MeasureDeleteDialogComponent]
})
export class NeumaticosMeasureModule {}
