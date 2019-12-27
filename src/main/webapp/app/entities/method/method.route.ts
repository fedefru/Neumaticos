import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Method } from 'app/shared/model/method.model';
import { MethodService } from './method.service';
import { MethodComponent } from './method.component';
import { MethodDetailComponent } from './method-detail.component';
import { MethodUpdateComponent } from './method-update.component';
import { IMethod } from 'app/shared/model/method.model';

@Injectable({ providedIn: 'root' })
export class MethodResolve implements Resolve<IMethod> {
  constructor(private service: MethodService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IMethod> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((method: HttpResponse<Method>) => method.body));
    }
    return of(new Method());
  }
}

export const methodRoute: Routes = [
  {
    path: '',
    component: MethodComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'neumaticosApp.method.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: MethodDetailComponent,
    resolve: {
      method: MethodResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'neumaticosApp.method.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: MethodUpdateComponent,
    resolve: {
      method: MethodResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'neumaticosApp.method.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: MethodUpdateComponent,
    resolve: {
      method: MethodResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'neumaticosApp.method.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
