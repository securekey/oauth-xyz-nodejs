import * as mongoose from 'mongoose';
import utils from '../utils/utils';

enum Type {
  BEARER = 'bearer',
  SHA3 = 'sha3'
}

export const HandleSchema = new mongoose.Schema({
  value: String,
  type: {
    type: String,
    enum: ['bearer', 'sha3']
  }
});

const HandleModel = mongoose.model('Handle', HandleSchema);

export const HandleSetSchema = new mongoose.Schema({
  transaction: HandleSchema,
  display: HandleSchema,
  user: HandleSchema,
  resource: HandleSchema,
  interact: HandleSchema,
  key: HandleSchema
});

export const HandleSet = mongoose.model('HandleSet', HandleSetSchema);

export class Handle {
  value: String;
  type: Type;

  constructor() {
    this.value = utils.generateRandomString(30);
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
