import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';
import { IItemcart, Itemcart } from 'app/shared/model/itemcart.model';
import { ItemcartService } from './itemcart.service';
import { IStock } from 'app/shared/model/stock.model';
import { StockService } from 'app/entities/stock/stock.service';

@Component({
  selector: 'jhi-itemcart-update',
  templateUrl: './itemcart-update.component.html'
})
export class ItemcartUpdateComponent implements OnInit {
  isSaving: boolean;

  stocks: IStock[];

  editForm = this.fb.group({
    id: [],
    quantity: [],
    detail: [],
    itemstock: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected itemcartService: ItemcartService,
    protected stockService: StockService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ itemcart }) => {
      this.updateForm(itemcart);
    });
    this.stockService
      .query()
      .subscribe((res: HttpResponse<IStock[]>) => (this.stocks = res.body), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(itemcart: IItemcart) {
    this.editForm.patchValue({
      id: itemcart.id,
      quantity: itemcart.quantity,
      detail: itemcart.detail,
      itemstock: itemcart.itemstock
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const itemcart = this.createFromForm();
    if (itemcart.id !== undefined) {
      this.subscribeToSaveResponse(this.itemcartService.update(itemcart));
    } else {
      this.subscribeToSaveResponse(this.itemcartService.create(itemcart));
    }
  }

  private createFromForm(): IItemcart {
    return {
      ...new Itemcart(),
      id: this.editForm.get(['id']).value,
      quantity: this.editForm.get(['quantity']).value,
      detail: this.editForm.get(['detail']).value,
      itemstock: this.editForm.get(['itemstock']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IItemcart>>) {
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

  trackStockById(index: number, item: IStock) {
    return item.id;
  }
}
