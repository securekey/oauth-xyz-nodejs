export class KeyFull {
  jwks: any;
  cert: String;
  did: String;
}

export class Key {
  key: KeyFull | String;
}
