import { Type } from "./type";

export class Symbol {
  constructor(public value: any, public id: string, public type: Type, public editable: boolean) {}
}
