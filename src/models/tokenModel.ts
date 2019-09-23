enum Type {
  BEARER = "bearer",
  SHA3 = "sha3"
}

export class TokenFull {
  value: String;
  type: Type;

  constructor() {
    var random = Math.floor((Math.random() * 10) ^ 5);
    this.value = random.toString();
    this.type = Type.BEARER;
  }
}
