import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IBrands, Brands } from 'app/shared/model/brands.model';
import { BrandsService } from './brands.service';

@Component({
  selector: 'jhi-brands-update',
  templateUrl: './brands-update.component.html'
})
export class BrandsUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    name: []
  });

  constructor(protected brandsService: BrandsService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ brands }) => {
      this.updateForm(brands);
    });
  }

  updateForm(brands: IBrands) {
    this.editForm.patchValue({
      id: brands.id,
      name: brands.name
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const brands = this.createFromForm();
    if (brands.id !== undefined) {
      this.subscribeToSaveResponse(this.brandsService.update(brands));
    } else {
      this.subscribeToSaveResponse(this.brandsService.create(brands));
    }
  }

  private createFromForm(): IBrands {
    return {
      ...new Brands(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IBrands>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
