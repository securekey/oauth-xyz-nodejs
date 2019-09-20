export class KeyFull {
  jwks: any;
  cert: String;
  did: String;

  constructor(Obj:any){
    this.jwks = Obj.jwks;
  }
}
