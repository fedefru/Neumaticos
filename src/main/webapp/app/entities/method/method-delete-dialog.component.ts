import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMethod } from 'app/shared/model/method.model';
import { MethodService } from './method.service';

@Component({
  templateUrl: './method-delete-dialog.component.html'
})
export class MethodDeleteDialogComponent {
  method: IMethod;

  constructor(protected methodService: MethodService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.methodService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'methodListModification',
        content: 'Deleted an method'
      });
      this.activeModal.dismiss(true);
    });
  }
}
