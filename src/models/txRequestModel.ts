import { KeyFull } from "./keyModel";
import { ClientRequest } from "./clientModel";
import { InteractRequest } from "./interactModel";
import { UserRequest } from "./userModel";
import { ResourceRequest } from "./resourcesModel";

export class TransactionRequest {
  handle: String;

  client: ClientRequest | String;
  interact: InteractRequest | String;
  user: UserRequest | String;
  resources: (ResourceRequest | String)[];
  key: KeyFull | String;

  constructor(Obj: any) {
    this.client = new ClientRequest(Obj.client);
    this.interact = new InteractRequest(Obj.interact);
    this.user = new UserRequest(Obj.user);
    this.resources = new Array<ResourceRequest>();

    Obj.resources.forEach((resource: any) => {
      this.resources.push(new ResourceRequest(resource));
    });

    this.key = new KeyFull(Obj.key);
  }
}
