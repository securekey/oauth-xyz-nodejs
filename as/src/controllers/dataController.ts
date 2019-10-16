/*
Copyright SecureKey Technologies Inc. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0
*/
import { TransactionModel } from '../models/transactionModel';
import { DisplayModel } from '../models/displayModel';
import { UserRequestModel } from '../models/userModel';
import { KeyModel } from '../models/keyModel';
import { ResourcesModel } from '../models/resourcesModel';

class DataController {
  // Transaction
  public getTransactionByObject(obj: any) {
    return TransactionModel.findOne(obj);
  }

  public getTransactionByHandle(handle: string) {
    return TransactionModel.findOne({
      'handles.transaction.value': handle
    });
  }

  public getTransactionByInteractId(id: string) {
    return TransactionModel.findOne({
      'interact.interact_id': id
    });
  }

  public getTransactionByUserCode(code: string) {
    return TransactionModel.findOne({
      'interact.user_code': code
    });
  }

  // Display
  public getDisplayByHandle(handle: string) {
    return DisplayModel.findOne({
      handle: handle
    });
  }

  // User
  public getUserByHandle(handle: string) {
    return UserRequestModel.findOne({
      handle: handle
    });
  }

  // Key
  public getKeyByHandle(handle: string) {
    return KeyModel.findOne({
      handle: handle
    });
  }

  // Resource
  public getResourceByHandle(handle: string) {
    return ResourcesModel.findOne({
      handle: handle
    });
  }
}

export default new DataController();
