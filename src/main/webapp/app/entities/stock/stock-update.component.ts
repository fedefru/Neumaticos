import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';
import { IStock, Stock } from 'app/shared/model/stock.model';
import { StockService } from './stock.service';
import { IProduct } from 'app/shared/model/product.model';
import { ProductService } from 'app/entities/product/product.service';
import { IBranch } from 'app/shared/model/branch.model';
import { BranchService } from 'app/entities/branch/branch.service';

@Component({
  selector: 'jhi-stock-update',
  templateUrl: './stock-update.component.html'
})
export class StockUpdateComponent implements OnInit {
  isSaving: boolean;

  products: IProduct[];

  branches: IBranch[];

  editForm = this.fb.group({
    id: [],
    stock: [],
    minimumstock: [],
    maximumstock: [],
    detail: [],
    product: [],
    branchname: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected stockService: StockService,
    protected productService: ProductService,
    protected branchService: BranchService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ stock }) => {
      this.updateForm(stock);
    });
    this.productService
      .query()
      .subscribe((res: HttpResponse<IProduct[]>) => (this.products = res.body), (res: HttpErrorResponse) => this.onError(res.message));
    this.branchService
      .query()
      .subscribe((res: HttpResponse<IBranch[]>) => (this.branches = res.body), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(stock: IStock) {
    this.editForm.patchValue({
      id: stock.id,
      stock: stock.stock,
      minimumstock: stock.minimumstock,
      maximumstock: stock.maximumstock,
      detail: stock.detail,
      product: stock.product,
      branchname: stock.branchname
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const stock = this.createFromForm();
    if (stock.id !== undefined) {
      this.subscribeToSaveResponse(this.stockService.update(stock));
    } else {
      this.subscribeToSaveResponse(this.stockService.create(stock));
    }
  }

  private createFromForm(): IStock {
    return {
      ...new Stock(),
      id: this.editForm.get(['id']).value,
      stock: this.editForm.get(['stock']).value,
      minimumstock: this.editForm.get(['minimumstock']).value,
      maximumstock: this.editForm.get(['maximumstock']).value,
      detail: this.editForm.get(['detail']).value,
      product: this.editForm.get(['product']).value,
      branchname: this.editForm.get(['branchname']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IStock>>) {
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

  trackProductById(index: number, item: IProduct) {
    return item.id;
  }

  trackBranchById(index: number, item: IBranch) {
    return item.id;
  }
}
