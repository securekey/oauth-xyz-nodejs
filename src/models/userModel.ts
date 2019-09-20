export class UserFull {
  assertion: String;
  type: String;

  constructor(Obj: any) {
    this.assertion = Obj.assertion;
    this.type = Obj.type;
  }
}
