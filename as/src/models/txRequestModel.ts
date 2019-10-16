/*
Copyright SecureKey Technologies Inc. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0
*/
import { KeyRequest } from './keyModel';
import { DisplayRequest } from './displayModel';
import { InteractRequest } from './interactModel';
import { UserRequest } from './userModel';
import { ResourceRequest } from './resourcesModel';

export class TransactionRequest {
  handle: string;

  interact_handle: string;
  display: DisplayRequest | string;
  interact: InteractRequest | string;
  user: UserRequest | string;
  resources: (ResourceRequest | string)[];
  key: KeyRequest | string;

  constructor(Obj: any) {
    if (Obj.handle) {
      this.handle = Obj.handle;
    }
    if (Obj.interact_handle) {
      this.interact_handle = Obj.interact_handle;
    }
    if (Obj.display) {
      if (typeof Obj.display === 'string') {
        this.display = Obj.display;
      } else {
        this.display = new DisplayRequest(Obj.display);
      }
    }
    if (Obj.interact) {
      if (typeof Obj.interact === 'string') {
        this.interact = Obj.interact;
      } else {
        this.interact = new InteractRequest(Obj.interact);
      }
    }
    if (Obj.user) {
      if (typeof Obj.user === 'string') {
        this.user = Obj.user;
      } else {
        this.user = new UserRequest(Obj.user);
      }
    }
    if (Obj.resources) {
      this.resources = new Array<ResourceRequest>();
      Obj.resources.forEach((resource: any) => {
        if (typeof resource === 'string') {
          this.resources.push(resource);
        } else {
          this.resources.push(new ResourceRequest(resource));
        }
      });
    }
    if (Obj.key) {
      if (typeof Obj.key === 'string') {
        this.key = Obj.key;
      } else {
        this.key = new KeyRequest(Obj.key);
      }
    }
  }

  public isDisplayRequestFull(): boolean {
    return !(typeof this.display === 'string');
  }

  public getDisplayDoc() {
    if (this.isDisplayRequestFull()) {
      return (<DisplayRequest>this.display).toSchema();
    }
  }

  public isInteractRequestFull(): boolean {
    return !(typeof this.interact === 'string');
  }

  public getInteractDoc() {
    if (this.isInteractRequestFull()) {
      return (<InteractRequest>this.interact).toSchema();
    }
  }

  public isUserRequestFull(): boolean {
    return !(typeof this.user === 'string');
  }

  public getUserDoc() {
    if (this.isUserRequestFull()) {
      return (<UserRequest>this.user).toSchema();
    }
  }

  public isKeyRequestFull(): boolean {
    return !(typeof this.key === 'string');
  }

  public getKeyDoc() {
    if (this.isKeyRequestFull()) {
      return (<KeyRequest>this.key).toSchema();
    }
  }
}
