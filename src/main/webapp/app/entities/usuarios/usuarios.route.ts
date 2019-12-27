import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Usuarios } from 'app/shared/model/usuarios.model';
import { UsuariosService } from './usuarios.service';
import { UsuariosComponent } from './usuarios.component';
import { UsuariosDetailComponent } from './usuarios-detail.component';
import { UsuariosUpdateComponent } from './usuarios-update.component';
import { IUsuarios } from 'app/shared/model/usuarios.model';

@Injectable({ providedIn: 'root' })
export class UsuariosResolve implements Resolve<IUsuarios> {
  constructor(private service: UsuariosService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IUsuarios> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((usuarios: HttpResponse<Usuarios>) => usuarios.body));
    }
    return of(new Usuarios());
  }
}

export const usuariosRoute: Routes = [
  {
    path: '',
    component: UsuariosComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'neumaticosApp.usuarios.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: UsuariosDetailComponent,
    resolve: {
      usuarios: UsuariosResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'neumaticosApp.usuarios.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: UsuariosUpdateComponent,
    resolve: {
      usuarios: UsuariosResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'neumaticosApp.usuarios.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: UsuariosUpdateComponent,
    resolve: {
      usuarios: UsuariosResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'neumaticosApp.usuarios.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
