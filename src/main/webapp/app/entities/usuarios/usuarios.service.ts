import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IUsuarios } from 'app/shared/model/usuarios.model';

type EntityResponseType = HttpResponse<IUsuarios>;
type EntityArrayResponseType = HttpResponse<IUsuarios[]>;

@Injectable({ providedIn: 'root' })
export class UsuariosService {
  public resourceUrl = SERVER_API_URL + 'api/usuarios';

  constructor(protected http: HttpClient) {}

  create(usuarios: IUsuarios): Observable<EntityResponseType> {
    return this.http.post<IUsuarios>(this.resourceUrl, usuarios, { observe: 'response' });
  }

  update(usuarios: IUsuarios): Observable<EntityResponseType> {
    return this.http.put<IUsuarios>(this.resourceUrl, usuarios, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IUsuarios>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IUsuarios[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
