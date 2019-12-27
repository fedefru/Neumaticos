import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IMethod, Method } from 'app/shared/model/method.model';
import { MethodService } from './method.service';

@Component({
  selector: 'jhi-method-update',
  templateUrl: './method-update.component.html'
})
export class MethodUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    method: []
  });

  constructor(protected methodService: MethodService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ method }) => {
      this.updateForm(method);
    });
  }

  updateForm(method: IMethod) {
    this.editForm.patchValue({
      id: method.id,
      method: method.method
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const method = this.createFromForm();
    if (method.id !== undefined) {
      this.subscribeToSaveResponse(this.methodService.update(method));
    } else {
      this.subscribeToSaveResponse(this.methodService.create(method));
    }
  }

  private createFromForm(): IMethod {
    return {
      ...new Method(),
      id: this.editForm.get(['id']).value,
      method: this.editForm.get(['method']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMethod>>) {
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
