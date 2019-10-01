import { TransactionModel } from '../models/transactionModel';
import { ClientModel } from '../models/clientModel';
import * as mongoose from 'mongoose';

class DataController {
  // Transaction
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

  // Client
  public getClientByHandle(handle: string) {
    return ClientModel.findOne({
      handle: handle
    });
  }
}

export default new DataController();
