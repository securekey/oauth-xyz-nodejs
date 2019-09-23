import { Handle } from "./handleModel";

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
  resources_handle: Handle;
  key_handle: Handle;

  constructor() {
    this.interaction_url = "localhost:3000/interact/test";
    this.server_nonce = "12345";
    this.handle = new Handle();
  }
}
