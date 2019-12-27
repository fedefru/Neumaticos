import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IItemcart } from 'app/shared/model/itemcart.model';

@Component({
  selector: 'jhi-itemcart-detail',
  templateUrl: './itemcart-detail.component.html'
})
export class ItemcartDetailComponent implements OnInit {
  itemcart: IItemcart;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ itemcart }) => {
      this.itemcart = itemcart;
    });
  }

  previousState() {
    window.history.back();
  }
}
