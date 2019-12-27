import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';
import { IProduct, Product } from 'app/shared/model/product.model';
import { ProductService } from './product.service';
import { IMeasure } from 'app/shared/model/measure.model';
import { MeasureService } from 'app/entities/measure/measure.service';
import { IBrands } from 'app/shared/model/brands.model';
import { BrandsService } from 'app/entities/brands/brands.service';

@Component({
  selector: 'jhi-product-update',
  templateUrl: './product-update.component.html'
})
export class ProductUpdateComponent implements OnInit {
  isSaving: boolean;

  measures: IMeasure[];

  brands: IBrands[];

  editForm = this.fb.group({
    id: [],
    price: [],
    detail: [],
    measure: [],
    brands: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected productService: ProductService,
    protected measureService: MeasureService,
    protected brandsService: BrandsService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ product }) => {
      this.updateForm(product);
    });
    this.measureService
      .query()
      .subscribe((res: HttpResponse<IMeasure[]>) => (this.measures = res.body), (res: HttpErrorResponse) => this.onError(res.message));
    this.brandsService
      .query()
      .subscribe((res: HttpResponse<IBrands[]>) => (this.brands = res.body), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(product: IProduct) {
    this.editForm.patchValue({
      id: product.id,
      price: product.price,
      detail: product.detail,
      measure: product.measure,
      brands: product.brands
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const product = this.createFromForm();
    if (product.id !== undefined) {
      this.subscribeToSaveResponse(this.productService.update(product));
    } else {
      this.subscribeToSaveResponse(this.productService.create(product));
    }
  }

  private createFromForm(): IProduct {
    return {
      ...new Product(),
      id: this.editForm.get(['id']).value,
      price: this.editForm.get(['price']).value,
      detail: this.editForm.get(['detail']).value,
      measure: this.editForm.get(['measure']).value,
      brands: this.editForm.get(['brands']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProduct>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackMeasureById(index: number, item: IMeasure) {
    return item.id;
  }

  trackBrandsById(index: number, item: IBrands) {
    return item.id;
  }
}
