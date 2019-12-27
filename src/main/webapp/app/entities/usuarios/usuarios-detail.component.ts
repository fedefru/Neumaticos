import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IUsuarios } from 'app/shared/model/usuarios.model';

@Component({
  selector: 'jhi-usuarios-detail',
  templateUrl: './usuarios-detail.component.html'
})
export class UsuariosDetailComponent implements OnInit {
  usuarios: IUsuarios;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ usuarios }) => {
      this.usuarios = usuarios;
    });
  }

  previousState() {
    window.history.back();
  }
}
