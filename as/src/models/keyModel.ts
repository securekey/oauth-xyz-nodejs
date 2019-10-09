import * as mongoose from 'mongoose';

export const KeySchema = new mongoose.Schema({
  handle: String,
  jwks: {
    type: String,
    get: function(data) {
      try {
        return JSON.parse(data);
      } catch (err) {
        return data;
      }
    },
    set: function(data) {
      return JSON.stringify(data);
    }
  },
  cert: String,
  did: String
});

export const KeyModel = mongoose.model('Key', KeySchema);

export class KeyRequest {
  handle: String;
  jwks: any;
  cert: String;
  did: String;

  constructor(Obj: any) {
    this.jwks = Obj.jwks;
  }

  public toSchema() {
    var key = new KeyModel({
      jwks: this.jwks,
      cert: this.cert,
      did: this.did
    });

    return key;
  }
}
