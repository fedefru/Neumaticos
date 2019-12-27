import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NeumaticosSharedModule } from 'app/shared/shared.module';
import { MethodComponent } from './method.component';
import { MethodDetailComponent } from './method-detail.component';
import { MethodUpdateComponent } from './method-update.component';
import { MethodDeleteDialogComponent } from './method-delete-dialog.component';
import { methodRoute } from './method.route';

@NgModule({
  imports: [NeumaticosSharedModule, RouterModule.forChild(methodRoute)],
  declarations: [MethodComponent, MethodDetailComponent, MethodUpdateComponent, MethodDeleteDialogComponent],
  entryComponents: [MethodDeleteDialogComponent]
})
export class NeumaticosMethodModule {}
