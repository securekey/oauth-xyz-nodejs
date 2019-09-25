import { TransactionModel } from "../models/transactionModel";
import * as mongoose from "mongoose";

class DataController {
  public async getTransactionByHandle(handle: String): Promise<any> {
    return TransactionModel.findOne({
      "handles.transaction.value": handle
    }).exec();
  }

  public async getTransactionByInteractId(id: String): Promise<any> {
    return TransactionModel.findOne({ "interact.interact_id": id }).exec();
  }

  public async getTransactionByUserCode(code: String): Promise<any> {
    return TransactionModel.findOne({ "interact.user_code": code }).exec();
  }
}

export default new DataController();
