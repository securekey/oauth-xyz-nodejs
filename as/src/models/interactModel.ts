/*
Copyright SecureKey Technologies Inc. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0
*/
import * as mongoose from 'mongoose';
export const InteractSchema = new mongoose.Schema({
  interaction_url: String,
  interact_id: String,
  callback: String,
  client_nonce: String,
  server_nonce: String,
  interact_handle: String,
  user_code: String,
  user_code_url: String,
  can_redirect: Boolean,
  can_user_code: Boolean
});

export const InteractModel = mongoose.model('Interact', InteractSchema);

export class InteractRequest {
  callback: {
    uri: String,
    nonce: String
  };
  redirect: Boolean;
  user_code: Boolean;

  constructor(Obj: any) {
    this.callback = Obj.callback;
    this.redirect = Obj.redirect;
    this.user_code = Obj.user_code;
  }

  public toSchema() {
    var interact = new InteractModel({
      callback: this.callback ? this.callback.uri : null,
      client_nonce: this.callback ? this.callback.nonce : null,
      can_redirect: this.redirect,
      can_user_code: this.user_code
    });

    return interact;
  }
}
