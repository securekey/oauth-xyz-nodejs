import { Handle } from "./handleModel";
import { TransactionModel } from "./transactionModel";

export class TransactionResponse {
  // Next Step: Redirect
  interaction_url: String;
  server_nonce: String;

  // Next Step: Device
  user_code_url: String;
  user_code: String;

  // Next Step: Wait
  wait: Number;

  // Next Step: Token
  access_token: Handle;

  // Handles
  handle: Handle; // Transaction Handle
  client_handle: Handle;
  user_handle: Handle;
  resource_handle: Handle;
  key_handle: Handle;

  constructor(Obj: any) {
    this.interaction_url = Obj.interact.url;
    this.server_nonce = Obj.interact.server_nonce;
    this.user_code_url = Obj.interact.user_code_url;
    this.user_code = Obj.interact.user_code;
    this.access_token = Obj.access_token;
    this.handle = Obj.handles.transaction;
    this.client_handle = Obj.handles.client;
    this.user_handle = Obj.handles.user;
    this.resource_handle = Obj.handles.resource;
    this.key_handle = Obj.handles.key;
  }
}
