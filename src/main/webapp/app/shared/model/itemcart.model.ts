import { IStock } from 'app/shared/model/stock.model';

export interface IItemcart {
  id?: number;
  quantity?: number;
  detail?: string;
  itemstock?: IStock;
}

export class Itemcart implements IItemcart {
  constructor(public id?: number, public quantity?: number, public detail?: string, public itemstock?: IStock) {}
}
