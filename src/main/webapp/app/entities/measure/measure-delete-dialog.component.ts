import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMeasure } from 'app/shared/model/measure.model';
import { MeasureService } from './measure.service';

@Component({
  templateUrl: './measure-delete-dialog.component.html'
})
export class MeasureDeleteDialogComponent {
  measure: IMeasure;

  constructor(protected measureService: MeasureService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.measureService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'measureListModification',
        content: 'Deleted an measure'
      });
      this.activeModal.dismiss(true);
    });
  }
}
