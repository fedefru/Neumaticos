import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IBrands } from 'app/shared/model/brands.model';
import { BrandsService } from './brands.service';

@Component({
  templateUrl: './brands-delete-dialog.component.html'
})
export class BrandsDeleteDialogComponent {
  brands: IBrands;

  constructor(protected brandsService: BrandsService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.brandsService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'brandsListModification',
        content: 'Deleted an brands'
      });
      this.activeModal.dismiss(true);
    });
  }
}
