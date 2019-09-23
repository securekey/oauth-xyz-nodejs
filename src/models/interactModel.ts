import * as mongoose from "mongoose";

enum Type {
  REDIRECT = "redirect",
  DEVICE = "device"
}

export const InteractSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["redirect", "device"]
  },
  url: String,
  interact_id: String,
  callback: String,
  client_nonce: String,
  server_nonce: String,
  interact_handle: String,
  user_code: String,
  user_code_url: String
});

const Interact = mongoose.model("Interact", InteractSchema);

export class InteractRequest {
  type: Type;
  callback: String;
  nonce: String;

  constructor(Obj: any) {
    this.type = Obj.type;
    this.callback = Obj.callback;
    this.nonce = Obj.nonce;
  }

  public toSchema() {
    var interact = new Interact({
      callback: this.callback,
      type: this.type.toString(),
      client_nonce: this.nonce
    });

    return interact;
  }
}
