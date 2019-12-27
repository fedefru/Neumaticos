export interface IMethod {
  id?: number;
  method?: string;
}

export class Method implements IMethod {
  constructor(public id?: number, public method?: string) {}
}
