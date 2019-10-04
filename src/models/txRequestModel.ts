import { KeyFull } from './keyModel';
import { ClientRequest } from './clientModel';
import { InteractRequest } from './interactModel';
import { UserRequest } from './userModel';
import { ResourceRequest } from './resourcesModel';

export class TransactionRequest {
  handle: string;

  client: ClientRequest | string;
  interact: InteractRequest | string;
  user: UserRequest | string;
  resources: (ResourceRequest | string)[];
  key: KeyFull | string;

  constructor(Obj: any) {
    if (Obj.handle) {
      this.handle = Obj.handle;
    } else {
      if (Obj.client) {
        if (typeof Obj.client === 'string') {
          this.client = Obj.client;
        } else {
          this.client = new ClientRequest(Obj.client);
        }
      }
      this.interact = new InteractRequest(Obj.interact);
      this.user = new UserRequest(Obj.user);
      this.resources = new Array<ResourceRequest>();

      Obj.resources.forEach((resource: any) => {
        if (typeof resource === 'string') {
          this.resources.push(resource);
        } else {
          this.resources.push(new ResourceRequest(resource));
        }
      });

      this.key = new KeyFull(Obj.key);
    }
  }

  public isClientRequestFull(): boolean {
    return !(typeof this.client === 'string');
  }

  public getClientDoc() {
    if (this.isClientRequestFull()) {
      return (<ClientRequest>this.client).toSchema();
    }
  }

  public isInteractRequestFull(): boolean {
    return !(typeof this.interact === 'string')
  }

  public getInteractDoc() {
    if (this.isInteractRequestFull()) {
      return (<InteractRequest>this.interact).toSchema();
    }
  }
}
