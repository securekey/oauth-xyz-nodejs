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

  constructor(Obj: any){
    this.client = new ClientFull(Obj.client);
    this.interact = new InteractFull(Obj.interact);
    this.user = new UserFull(Obj.user);
    // this.resources = new ResourceFull(Obj.resources)[];
    this.key = new KeyFull(Obj.key);

  }
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

  constructor(){
    this.interaction_url = "localhost:3000/interact/test"
    this.server_nonce = "12345"
    this.handle = new Handle();
  }
}

/*
Client request incoming

if(handle != null) this is new transation request

  generate interaction user_code_url
  generate server nonce

  generate transaction handle
  store transaction handle in MongoDB

  pass client
  "handle": {
    "value": "80UPRY5NM33OMUKMKSKU",
    "type": "bearer"
}


*/
