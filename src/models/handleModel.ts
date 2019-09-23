import * as mongoose from "mongoose";

enum Type {
  BEARER = "bearer",
  SHA3 = "sha3"
}

export const HandleSchema = new mongoose.Schema({
  value: String,
  type: {
    type: String,
    enum: ["bearer", "sha3"]
  }
});

const HandleModel = mongoose.model("Handle", HandleSchema);

export const HandleSetSchema = new mongoose.Schema({
  transaction: HandleSchema,
  client: HandleSchema,
  user: HandleSchema,
  resource: HandleSchema,
  interact: HandleSchema,
  key: HandleSchema
});

export class Handle {
  value: String;
  type: Type;

  constructor() {
    var random = Math.floor((Math.random() * 10) ^ 5);
    this.value = random.toString();
    this.type = Type.BEARER;
  }

  public toSchema() {
    var handle = new HandleModel({
      value: this.value,
      type: this.type.toString()
    });

    return handle;
  }
}
