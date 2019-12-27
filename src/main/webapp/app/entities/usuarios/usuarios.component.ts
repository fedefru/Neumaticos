import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IUsuarios } from 'app/shared/model/usuarios.model';
import { UsuariosService } from './usuarios.service';
import { UsuariosDeleteDialogComponent } from './usuarios-delete-dialog.component';

@Component({
  selector: 'jhi-usuarios',
  templateUrl: './usuarios.component.html'
})
export class UsuariosComponent implements OnInit, OnDestroy {
  usuarios: IUsuarios[];
  eventSubscriber: Subscription;

  constructor(protected usuariosService: UsuariosService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll() {
    this.usuariosService.query().subscribe((res: HttpResponse<IUsuarios[]>) => {
      this.usuarios = res.body;
    });
  }

  ngOnInit() {

    alert("Asdsss")
    this.loadAll();
    this.registerChangeInUsuarios();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IUsuarios) {
    return item.id;
  }

  registerChangeInUsuarios() {
    this.eventSubscriber = this.eventManager.subscribe('usuariosListModification', () => this.loadAll());
  }

  delete(usuarios: IUsuarios) {
    const modalRef = this.modalService.open(UsuariosDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.usuarios = usuarios;
  }
}
