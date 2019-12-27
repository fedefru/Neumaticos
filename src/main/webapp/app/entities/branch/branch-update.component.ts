import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IBranch, Branch } from 'app/shared/model/branch.model';
import { BranchService } from './branch.service';

@Component({
  selector: 'jhi-branch-update',
  templateUrl: './branch-update.component.html'
})
export class BranchUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    branchname: [],
    address: [],
    telephone: [],
    location: [],
    province: []
  });

  constructor(protected branchService: BranchService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ branch }) => {
      this.updateForm(branch);
    });
  }

  updateForm(branch: IBranch) {
    this.editForm.patchValue({
      id: branch.id,
      branchname: branch.branchname,
      address: branch.address,
      telephone: branch.telephone,
      location: branch.location,
      province: branch.province
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const branch = this.createFromForm();
    if (branch.id !== undefined) {
      this.subscribeToSaveResponse(this.branchService.update(branch));
    } else {
      this.subscribeToSaveResponse(this.branchService.create(branch));
    }
  }

  private createFromForm(): IBranch {
    return {
      ...new Branch(),
      id: this.editForm.get(['id']).value,
      branchname: this.editForm.get(['branchname']).value,
      address: this.editForm.get(['address']).value,
      telephone: this.editForm.get(['telephone']).value,
      location: this.editForm.get(['location']).value,
      province: this.editForm.get(['province']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IBranch>>) {
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
