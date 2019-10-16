/*
Copyright SecureKey Technologies Inc. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0
*/
import { PendingTransactionModel } from '../models/pendingTransaction';

class DataController {
  // Pending Transaction
  public getTransactionsByOwner(owner: string) {
    return PendingTransactionModel.find({
      owner: owner
    });
  }

  public getTransactionByIdAndOwner(id: string, owner: string) {
    return PendingTransactionModel.findOne({
      _id: id,
      owner: owner
    });
  }

  public getTransactionByCallbackIdAndOwner(
    callback_id: string,
    owner: string
  ) {
    return PendingTransactionModel.findOne({
      callback_id: callback_id,
      owner: owner
    });
  }

  public clearAllTransactions() {
    return PendingTransactionModel.remove({});
  }
}

export default new DataController();
