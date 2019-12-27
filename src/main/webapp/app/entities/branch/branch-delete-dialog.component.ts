import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IBranch } from 'app/shared/model/branch.model';
import { BranchService } from './branch.service';

@Component({
  templateUrl: './branch-delete-dialog.component.html'
})
export class BranchDeleteDialogComponent {
  branch: IBranch;

  constructor(protected branchService: BranchService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.branchService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'branchListModification',
        content: 'Deleted an branch'
      });
      this.activeModal.dismiss(true);
    });
  }
}
