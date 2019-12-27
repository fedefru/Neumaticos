import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Itemcart } from 'app/shared/model/itemcart.model';
import { ItemcartService } from './itemcart.service';
import { ItemcartComponent } from './itemcart.component';
import { ItemcartDetailComponent } from './itemcart-detail.component';
import { ItemcartUpdateComponent } from './itemcart-update.component';
import { IItemcart } from 'app/shared/model/itemcart.model';

@Injectable({ providedIn: 'root' })
export class ItemcartResolve implements Resolve<IItemcart> {
  constructor(private service: ItemcartService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IItemcart> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((itemcart: HttpResponse<Itemcart>) => itemcart.body));
    }
    return of(new Itemcart());
  }
}

export const itemcartRoute: Routes = [
  {
    path: '',
    component: ItemcartComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'neumaticosApp.itemcart.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ItemcartDetailComponent,
    resolve: {
      itemcart: ItemcartResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'neumaticosApp.itemcart.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ItemcartUpdateComponent,
    resolve: {
      itemcart: ItemcartResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'neumaticosApp.itemcart.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ItemcartUpdateComponent,
    resolve: {
      itemcart: ItemcartResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'neumaticosApp.itemcart.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
