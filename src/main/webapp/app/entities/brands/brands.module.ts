import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NeumaticosSharedModule } from 'app/shared/shared.module';
import { BrandsComponent } from './brands.component';
import { BrandsDetailComponent } from './brands-detail.component';
import { BrandsUpdateComponent } from './brands-update.component';
import { BrandsDeleteDialogComponent } from './brands-delete-dialog.component';
import { brandsRoute } from './brands.route';

@NgModule({
  imports: [NeumaticosSharedModule, RouterModule.forChild(brandsRoute)],
  declarations: [BrandsComponent, BrandsDetailComponent, BrandsUpdateComponent, BrandsDeleteDialogComponent],
  entryComponents: [BrandsDeleteDialogComponent]
})
export class NeumaticosBrandsModule {}
