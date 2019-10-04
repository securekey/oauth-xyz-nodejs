import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  id: String
});

export const UserModel = mongoose.model('User', UserSchema);

export const UserRequestSchema = new mongoose.Schema({
  handle: String,
  assertion: String,
  type: String
});

export const UserRequestModel = mongoose.model(
  'UserRequest',
  UserRequestSchema
);

export class UserRequest {
  handle: String;
  assertion: String;
  type: String;

  constructor(Obj: any) {
    this.assertion = Obj.assertion;
    this.type = Obj.type;
  }

  public toSchema() {
    var user = new UserRequestModel({
      assertion: this.assertion,
      type: this.type
    });

    return user;
  }
}
