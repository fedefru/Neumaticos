export interface IMeasure {
  id?: number;
  tiretype?: string;
  width?: number;
  height?: number;
  diameter?: number;
  speedrating?: string;
  load?: number;
  detail?: string;
}

export class Measure implements IMeasure {
  constructor(
    public id?: number,
    public tiretype?: string,
    public width?: number,
    public height?: number,
    public diameter?: number,
    public speedrating?: string,
    public load?: number,
    public detail?: string
  ) {}
}
