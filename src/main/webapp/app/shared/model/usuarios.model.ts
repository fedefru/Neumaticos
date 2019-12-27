export interface IUsuarios {
  id?: number;
  name?: string;
  surname?: string;
  email?: string;
}

export class Usuarios implements IUsuarios {
  constructor(public id?: number, public name?: string, public surname?: string, public email?: string) {}
}
