import { IProduct } from 'app/shared/model/product.model';
import { IBranch } from 'app/shared/model/branch.model';

export interface IStock {
  id?: number;
  stock?: number;
  minimumstock?: number;
  maximumstock?: number;
  detail?: string;
  product?: IProduct;
  branchname?: IBranch;
}

export class Stock implements IStock {
  constructor(
    public id?: number,
    public stock?: number,
    public minimumstock?: number,
    public maximumstock?: number,
    public detail?: string,
    public product?: IProduct,
    public branchname?: IBranch
  ) {}
}
