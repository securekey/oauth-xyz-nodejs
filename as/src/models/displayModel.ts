import * as mongoose from 'mongoose';

export const DisplaySchema = new mongoose.Schema({
  handle: String,
  name: String,
  uri: String,
  logo_uri: String
});

export const DisplayModel = mongoose.model('Display', DisplaySchema);

export class DisplayRequest {
  handle: String;
  name: String;
  uri: String;
  logo_uri: String;

  constructor(Obj: any) {
    this.name = Obj.name;
    this.uri = Obj.uri;
    this.logo_uri = Obj.logo_uri;
  }

  public toSchema() {
    var display = new DisplayModel({
      name: this.name,
      uri: this.uri,
      logo_uri: this.logo_uri
    });

    return display;
  }
}
