import { IMeasure } from 'app/shared/model/measure.model';
import { IBrands } from 'app/shared/model/brands.model';

export interface IProduct {
  id?: number;
  price?: number;
  detail?: string;
  measure?: IMeasure;
  brands?: IBrands;
}

export class Product implements IProduct {
  constructor(public id?: number, public price?: number, public detail?: string, public measure?: IMeasure, public brands?: IBrands) {}
}
