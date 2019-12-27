import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IMeasure, Measure } from 'app/shared/model/measure.model';
import { MeasureService } from './measure.service';

@Component({
  selector: 'jhi-measure-update',
  templateUrl: './measure-update.component.html'
})
export class MeasureUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    tiretype: [],
    width: [],
    height: [],
    diameter: [],
    speedrating: [],
    load: [],
    detail: []
  });

  constructor(protected measureService: MeasureService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ measure }) => {
      this.updateForm(measure);
    });
  }

  updateForm(measure: IMeasure) {
    this.editForm.patchValue({
      id: measure.id,
      tiretype: measure.tiretype,
      width: measure.width,
      height: measure.height,
      diameter: measure.diameter,
      speedrating: measure.speedrating,
      load: measure.load,
      detail: measure.detail
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const measure = this.createFromForm();
    if (measure.id !== undefined) {
      this.subscribeToSaveResponse(this.measureService.update(measure));
    } else {
      this.subscribeToSaveResponse(this.measureService.create(measure));
    }
  }

  private createFromForm(): IMeasure {
    return {
      ...new Measure(),
      id: this.editForm.get(['id']).value,
      tiretype: this.editForm.get(['tiretype']).value,
      width: this.editForm.get(['width']).value,
      height: this.editForm.get(['height']).value,
      diameter: this.editForm.get(['diameter']).value,
      speedrating: this.editForm.get(['speedrating']).value,
      load: this.editForm.get(['load']).value,
      detail: this.editForm.get(['detail']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMeasure>>) {
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
