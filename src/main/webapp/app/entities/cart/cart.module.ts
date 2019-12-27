import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NeumaticosSharedModule } from 'app/shared/shared.module';
import { CartComponent } from './cart.component';
import { CartDetailComponent } from './cart-detail.component';
import { CartUpdateComponent } from './cart-update.component';
import { CartDeleteDialogComponent } from './cart-delete-dialog.component';
import { cartRoute } from './cart.route';

@NgModule({
  imports: [NeumaticosSharedModule, RouterModule.forChild(cartRoute)],
  declarations: [CartComponent, CartDetailComponent, CartUpdateComponent, CartDeleteDialogComponent],
  entryComponents: [CartDeleteDialogComponent]
})
export class NeumaticosCartModule {}
