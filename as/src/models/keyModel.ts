/*
Copyright SecureKey Technologies Inc. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0
*/
import * as mongoose from 'mongoose';

export const KeySchema = new mongoose.Schema({
  handle: String,
  jwks: Object,
  cert: String,
  did: String,
  proof: String
});

export const KeyModel = mongoose.model('Key', KeySchema);

export class KeyRequest {
  handle: String;
  jwks: any;
  cert: String;
  did: String;
  proof: String;

  constructor(Obj: any) {
    this.jwks = Obj.jwks;
    this.cert = Obj.cert;
    this.did = Obj.did;
    this.proof = Obj.proof;
  }

  public toSchema() {
    var key = new KeyModel({
      proof: this.proof,
      jwks: this.jwks,
      cert: this.cert,
      did: this.did
    });

    return key;
  }
}
