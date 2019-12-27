import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IUsuarios, Usuarios } from 'app/shared/model/usuarios.model';
import { UsuariosService } from './usuarios.service';

@Component({
  selector: 'jhi-usuarios-update',
  templateUrl: './usuarios-update.component.html'
})
export class UsuariosUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    name: [],
    surname: [],
    email: []
  });

  constructor(protected usuariosService: UsuariosService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ usuarios }) => {
      this.updateForm(usuarios);
    });
  }

  updateForm(usuarios: IUsuarios) {
    this.editForm.patchValue({
      id: usuarios.id,
      name: usuarios.name,
      surname: usuarios.surname,
      email: usuarios.email
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const usuarios = this.createFromForm();
    if (usuarios.id !== undefined) {
      this.subscribeToSaveResponse(this.usuariosService.update(usuarios));
    } else {
      this.subscribeToSaveResponse(this.usuariosService.create(usuarios));
    }
  }

  private createFromForm(): IUsuarios {
    return {
      ...new Usuarios(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value,
      surname: this.editForm.get(['surname']).value,
      email: this.editForm.get(['email']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IUsuarios>>) {
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
