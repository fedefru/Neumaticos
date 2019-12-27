import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NeumaticosSharedModule } from 'app/shared/shared.module';
import { ItemcartComponent } from './itemcart.component';
import { ItemcartDetailComponent } from './itemcart-detail.component';
import { ItemcartUpdateComponent } from './itemcart-update.component';
import { ItemcartDeleteDialogComponent } from './itemcart-delete-dialog.component';
import { itemcartRoute } from './itemcart.route';

@NgModule({
  imports: [NeumaticosSharedModule, RouterModule.forChild(itemcartRoute)],
  declarations: [ItemcartComponent, ItemcartDetailComponent, ItemcartUpdateComponent, ItemcartDeleteDialogComponent],
  entryComponents: [ItemcartDeleteDialogComponent]
})
export class NeumaticosItemcartModule {}
