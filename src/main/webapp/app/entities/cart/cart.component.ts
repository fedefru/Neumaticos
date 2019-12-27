import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICart } from 'app/shared/model/cart.model';
import { CartService } from './cart.service';
import { CartDeleteDialogComponent } from './cart-delete-dialog.component';

@Component({
  selector: 'jhi-cart',
  templateUrl: './cart.component.html'
})
export class CartComponent implements OnInit, OnDestroy {
  carts: ICart[];
  eventSubscriber: Subscription;

  constructor(protected cartService: CartService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll() {
    this.cartService.query().subscribe((res: HttpResponse<ICart[]>) => {
      this.carts = res.body;
    });
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInCarts();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ICart) {
    return item.id;
  }

  registerChangeInCarts() {
    this.eventSubscriber = this.eventManager.subscribe('cartListModification', () => this.loadAll());
  }

  delete(cart: ICart) {
    const modalRef = this.modalService.open(CartDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.cart = cart;
  }
}
