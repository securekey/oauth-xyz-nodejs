import { ClientFull } from "./clientModel";
import { InteractFull } from "./interactModel";
import { UserFull } from "./userModel";
import { ResourceFull } from "./resourcesModel";
import { KeyFull } from "./keyModel";
import { Handle } from "./handleModel";

export class TransactionRequest {
  handle: String;

  client: ClientFull | String;
  interact: InteractFull | String;
  user: UserFull | String;
  resources: (ResourceFull | String)[];
  key: KeyFull | String;
}

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
}
