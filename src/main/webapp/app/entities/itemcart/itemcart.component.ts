import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IItemcart } from 'app/shared/model/itemcart.model';
import { ItemcartService } from './itemcart.service';
import { ItemcartDeleteDialogComponent } from './itemcart-delete-dialog.component';

@Component({
  selector: 'jhi-itemcart',
  templateUrl: './itemcart.component.html'
})
export class ItemcartComponent implements OnInit, OnDestroy {
  itemcarts: IItemcart[];
  eventSubscriber: Subscription;

  constructor(protected itemcartService: ItemcartService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll() {
    this.itemcartService.query().subscribe((res: HttpResponse<IItemcart[]>) => {
      this.itemcarts = res.body;
    });
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInItemcarts();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IItemcart) {
    return item.id;
  }

  registerChangeInItemcarts() {
    this.eventSubscriber = this.eventManager.subscribe('itemcartListModification', () => this.loadAll());
  }

  delete(itemcart: IItemcart) {
    const modalRef = this.modalService.open(ItemcartDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.itemcart = itemcart;
  }
}
