import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IItemcart } from 'app/shared/model/itemcart.model';
import { ItemcartService } from './itemcart.service';

@Component({
  templateUrl: './itemcart-delete-dialog.component.html'
})
export class ItemcartDeleteDialogComponent {
  itemcart: IItemcart;

  constructor(protected itemcartService: ItemcartService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.itemcartService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'itemcartListModification',
        content: 'Deleted an itemcart'
      });
      this.activeModal.dismiss(true);
    });
  }
}
