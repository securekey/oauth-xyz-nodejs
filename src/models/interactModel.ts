export class InteractFull {
  type: String;
  callback: String;
  nonce: String;

  constructor(Obj: any){
    this.type = Obj.type;
    this.callback = Obj.callback;
    this.nonce = Obj.nonce;
  }
}
