import { TransactionModel } from '../models/transactionModel';
import { ClientModel } from '../models/clientModel';

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

  // Client
  public getClientByHandle(handle: string) {
    return ClientModel.findOne({
      handle: handle
    });
  }
}

export default new DataController();
