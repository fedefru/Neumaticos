export interface IBranch {
  id?: number;
  branchname?: string;
  address?: string;
  telephone?: number;
  location?: string;
  province?: string;
}

export class Branch implements IBranch {
  constructor(
    public id?: number,
    public branchname?: string,
    public address?: string,
    public telephone?: number,
    public location?: string,
    public province?: string
  ) {}
}
