import { PendingTransactionModel } from '../models/pendingTransaction';

class DataController {
  // Pending Transaction
  public getTransactionsByOwner(owner: string) {
    PendingTransactionModel.find({
      owner: owner
    });
  }

  public getTransactionByIdAndOwner(id: string, owner: string) {
    PendingTransactionModel.findOne({
      id: id,
      owner: owner
    });
  }

  public getTransactionByCallbackIdAndOwner(
    callback_id: string,
    owner: string
  ) {
    PendingTransactionModel.find({
      callback_id: callback_id,
      owner: owner
    });
  }
}

export default new DataController();
