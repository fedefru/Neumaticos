import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IMethod } from 'app/shared/model/method.model';
import { MethodService } from './method.service';
import { MethodDeleteDialogComponent } from './method-delete-dialog.component';

@Component({
  selector: 'jhi-method',
  templateUrl: './method.component.html'
})
export class MethodComponent implements OnInit, OnDestroy {
  methods: IMethod[];
  eventSubscriber: Subscription;

  constructor(protected methodService: MethodService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll() {
    this.methodService.query().subscribe((res: HttpResponse<IMethod[]>) => {
      this.methods = res.body;
    });
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInMethods();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IMethod) {
    return item.id;
  }

  registerChangeInMethods() {
    this.eventSubscriber = this.eventManager.subscribe('methodListModification', () => this.loadAll());
  }

  delete(method: IMethod) {
    const modalRef = this.modalService.open(MethodDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.method = method;
  }
}
