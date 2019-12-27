import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IItemcart } from 'app/shared/model/itemcart.model';

type EntityResponseType = HttpResponse<IItemcart>;
type EntityArrayResponseType = HttpResponse<IItemcart[]>;

@Injectable({ providedIn: 'root' })
export class ItemcartService {
  public resourceUrl = SERVER_API_URL + 'api/itemcarts';

  constructor(protected http: HttpClient) {}

  create(itemcart: IItemcart): Observable<EntityResponseType> {
    return this.http.post<IItemcart>(this.resourceUrl, itemcart, { observe: 'response' });
  }

  update(itemcart: IItemcart): Observable<EntityResponseType> {
    return this.http.put<IItemcart>(this.resourceUrl, itemcart, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IItemcart>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IItemcart[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
