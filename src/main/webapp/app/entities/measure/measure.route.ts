import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Measure } from 'app/shared/model/measure.model';
import { MeasureService } from './measure.service';
import { MeasureComponent } from './measure.component';
import { MeasureDetailComponent } from './measure-detail.component';
import { MeasureUpdateComponent } from './measure-update.component';
import { IMeasure } from 'app/shared/model/measure.model';

@Injectable({ providedIn: 'root' })
export class MeasureResolve implements Resolve<IMeasure> {
  constructor(private service: MeasureService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IMeasure> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((measure: HttpResponse<Measure>) => measure.body));
    }
    return of(new Measure());
  }
}

export const measureRoute: Routes = [
  {
    path: '',
    component: MeasureComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'neumaticosApp.measure.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: MeasureDetailComponent,
    resolve: {
      measure: MeasureResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'neumaticosApp.measure.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: MeasureUpdateComponent,
    resolve: {
      measure: MeasureResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'neumaticosApp.measure.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: MeasureUpdateComponent,
    resolve: {
      measure: MeasureResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'neumaticosApp.measure.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
