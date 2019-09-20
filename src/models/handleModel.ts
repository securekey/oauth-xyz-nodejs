enum Type {
  BEARER = "bearer",
  SHA3 = "sha3"
}

export class Handle {
  value: String;
  type: Type;

  constructor(){
    this.value = "23456"
    this.type = Type.BEARER;
  }
}
