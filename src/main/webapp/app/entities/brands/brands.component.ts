import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IBrands } from 'app/shared/model/brands.model';
import { BrandsService } from './brands.service';
import { BrandsDeleteDialogComponent } from './brands-delete-dialog.component';

@Component({
  selector: 'jhi-brands',
  templateUrl: './brands.component.html'
})
export class BrandsComponent implements OnInit, OnDestroy {
  brands: IBrands[];
  eventSubscriber: Subscription;

  constructor(protected brandsService: BrandsService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll() {
    this.brandsService.query().subscribe((res: HttpResponse<IBrands[]>) => {
      this.brands = res.body;
    });
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInBrands();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IBrands) {
    return item.id;
  }

  registerChangeInBrands() {
    this.eventSubscriber = this.eventManager.subscribe('brandsListModification', () => this.loadAll());
  }

  delete(brands: IBrands) {
    const modalRef = this.modalService.open(BrandsDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.brands = brands;
  }
}
