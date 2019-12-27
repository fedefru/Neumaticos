import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';
import { ICart, Cart } from 'app/shared/model/cart.model';
import { CartService } from './cart.service';
import { IItemcart } from 'app/shared/model/itemcart.model';
import { ItemcartService } from 'app/entities/itemcart/itemcart.service';
import { IUsuarios } from 'app/shared/model/usuarios.model';
import { UsuariosService } from 'app/entities/usuarios/usuarios.service';
import { IMethod } from 'app/shared/model/method.model';
import { MethodService } from 'app/entities/method/method.service';

@Component({
  selector: 'jhi-cart-update',
  templateUrl: './cart-update.component.html'
})
export class CartUpdateComponent implements OnInit {
  isSaving: boolean;

  itemcarts: IItemcart[];

  usuarios: IUsuarios[];

  methods: IMethod[];

  editForm = this.fb.group({
    id: [],
    shipping: [],
    total: [],
    detail: [],
    items: [],
    user: [],
    method: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected cartService: CartService,
    protected itemcartService: ItemcartService,
    protected usuariosService: UsuariosService,
    protected methodService: MethodService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ cart }) => {
      this.updateForm(cart);
    });
    this.itemcartService
      .query()
      .subscribe((res: HttpResponse<IItemcart[]>) => (this.itemcarts = res.body), (res: HttpErrorResponse) => this.onError(res.message));
    this.usuariosService
      .query()
      .subscribe((res: HttpResponse<IUsuarios[]>) => (this.usuarios = res.body), (res: HttpErrorResponse) => this.onError(res.message));
    this.methodService
      .query()
      .subscribe((res: HttpResponse<IMethod[]>) => (this.methods = res.body), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(cart: ICart) {
    this.editForm.patchValue({
      id: cart.id,
      shipping: cart.shipping,
      total: cart.total,
      detail: cart.detail,
      items: cart.items,
      user: cart.user,
      method: cart.method
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const cart = this.createFromForm();
    if (cart.id !== undefined) {
      this.subscribeToSaveResponse(this.cartService.update(cart));
    } else {
      this.subscribeToSaveResponse(this.cartService.create(cart));
    }
  }

  private createFromForm(): ICart {
    return {
      ...new Cart(),
      id: this.editForm.get(['id']).value,
      shipping: this.editForm.get(['shipping']).value,
      total: this.editForm.get(['total']).value,
      detail: this.editForm.get(['detail']).value,
      items: this.editForm.get(['items']).value,
      user: this.editForm.get(['user']).value,
      method: this.editForm.get(['method']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICart>>) {
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

  trackItemcartById(index: number, item: IItemcart) {
    return item.id;
  }

  trackUsuariosById(index: number, item: IUsuarios) {
    return item.id;
  }

  trackMethodById(index: number, item: IMethod) {
    return item.id;
  }
}
