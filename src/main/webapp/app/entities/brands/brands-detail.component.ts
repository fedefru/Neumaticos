import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IBrands } from 'app/shared/model/brands.model';

@Component({
  selector: 'jhi-brands-detail',
  templateUrl: './brands-detail.component.html'
})
export class BrandsDetailComponent implements OnInit {
  brands: IBrands;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ brands }) => {
      this.brands = brands;
    });
  }

  previousState() {
    window.history.back();
  }
}
