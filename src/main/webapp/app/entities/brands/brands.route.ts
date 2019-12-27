import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Brands } from 'app/shared/model/brands.model';
import { BrandsService } from './brands.service';
import { BrandsComponent } from './brands.component';
import { BrandsDetailComponent } from './brands-detail.component';
import { BrandsUpdateComponent } from './brands-update.component';
import { IBrands } from 'app/shared/model/brands.model';

@Injectable({ providedIn: 'root' })
export class BrandsResolve implements Resolve<IBrands> {
  constructor(private service: BrandsService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IBrands> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((brands: HttpResponse<Brands>) => brands.body));
    }
    return of(new Brands());
  }
}

export const brandsRoute: Routes = [
  {
    path: '',
    component: BrandsComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'neumaticosApp.brands.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: BrandsDetailComponent,
    resolve: {
      brands: BrandsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'neumaticosApp.brands.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: BrandsUpdateComponent,
    resolve: {
      brands: BrandsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'neumaticosApp.brands.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: BrandsUpdateComponent,
    resolve: {
      brands: BrandsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'neumaticosApp.brands.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
