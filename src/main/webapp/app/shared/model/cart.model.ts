import { IItemcart } from 'app/shared/model/itemcart.model';
import { IUsuarios } from 'app/shared/model/usuarios.model';
import { IMethod } from 'app/shared/model/method.model';

export interface ICart {
  id?: number;
  shipping?: number;
  total?: number;
  detail?: string;
  items?: IItemcart;
  user?: IUsuarios;
  method?: IMethod;
}

export class Cart implements ICart {
  constructor(
    public id?: number,
    public shipping?: number,
    public total?: number,
    public detail?: string,
    public items?: IItemcart,
    public user?: IUsuarios,
    public method?: IMethod
  ) {}
}
