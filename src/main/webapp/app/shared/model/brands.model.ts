export interface IBrands {
  id?: number;
  name?: string;
}

export class Brands implements IBrands {
  constructor(public id?: number, public name?: string) {}
}
