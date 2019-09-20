export class ClientFull {
  name: String;
  uri: String;
  logo_uri: String;

  constructor(Obj: any) {
    this.name = Obj.name;
    this.uri = Obj.uri;
    this.logo_uri = Obj.logo_uri;
  }
}
