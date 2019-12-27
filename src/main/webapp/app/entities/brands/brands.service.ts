import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IBrands } from 'app/shared/model/brands.model';

type EntityResponseType = HttpResponse<IBrands>;
type EntityArrayResponseType = HttpResponse<IBrands[]>;

@Injectable({ providedIn: 'root' })
export class BrandsService {
  public resourceUrl = SERVER_API_URL + 'api/brands';

  constructor(protected http: HttpClient) {}

  create(brands: IBrands): Observable<EntityResponseType> {
    return this.http.post<IBrands>(this.resourceUrl, brands, { observe: 'response' });
  }

  update(brands: IBrands): Observable<EntityResponseType> {
    return this.http.put<IBrands>(this.resourceUrl, brands, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IBrands>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IBrands[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
