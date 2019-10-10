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
      id: id,
      owner: owner
    });
  }

  public getTransactionByCallbackIdAndOwner(
    callback_id: string,
    owner: string
  ) {
    return PendingTransactionModel.find({
      callback_id: callback_id,
      owner: owner
    });
  }
}

export default new DataController();
