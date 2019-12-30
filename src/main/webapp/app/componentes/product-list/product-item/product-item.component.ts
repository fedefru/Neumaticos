import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { IProduct } from 'app/shared/model/product.model';
import { ProductService } from '../../../entities/product/product.service';

@Component({
  selector: 'jhi-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
  items: IProduct[];
  constructor(protected productService: ProductService) {}

  loadAll() {
    this.productService.query().subscribe((res: HttpResponse<IProduct[]>) => {
      this.items = res.body;
    });
  }

  ngOnInit() {
    this.loadAll();
  }
}
