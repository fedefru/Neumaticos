import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IMeasure } from 'app/shared/model/measure.model';

type EntityResponseType = HttpResponse<IMeasure>;
type EntityArrayResponseType = HttpResponse<IMeasure[]>;

@Injectable({ providedIn: 'root' })
export class MeasureService {
  public resourceUrl = SERVER_API_URL + 'api/measures';

  constructor(protected http: HttpClient) {}

  create(measure: IMeasure): Observable<EntityResponseType> {
    return this.http.post<IMeasure>(this.resourceUrl, measure, { observe: 'response' });
  }

  update(measure: IMeasure): Observable<EntityResponseType> {
    return this.http.put<IMeasure>(this.resourceUrl, measure, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IMeasure>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IMeasure[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
