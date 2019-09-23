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
    var randomIURL = Math.random();
    randomIURL = Math.floor(randomIURL * Math.pow(10, 15));
    this.interaction_url = "localhost:3000/interact/" + randomIURL.toString();

    var randomNonce = Math.random();
    randomNonce = Math.floor(randomNonce * Math.pow(10, 15));
    this.server_nonce = randomNonce.toString();
    this.handle = new Handle();
  }
}
