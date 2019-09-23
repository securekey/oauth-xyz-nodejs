import { TransactionModel } from "../models/transactionModel";
import * as mongoose from "mongoose";

class DataController {
  public async getTransactionByHandle(handle: String) {
    await TransactionModel.findOne(
      { "handles.transaction.value": handle },
      (err: Error, transaction: mongoose.Document) => {
        if (err) {
          return err;
        } else {
          return transaction;
        }
      }
    );
  }

  public getTransactionByInteractId(id: String) {
    TransactionModel.findOne(
      { "interact.interact_id": id },
      (err: Error, transaction: mongoose.Document) => {
        if (err) {
          return err;
        } else {
          return transaction;
        }
      }
    );
  }

  public getTransactionByUserCode(code: String) {
    TransactionModel.findOne(
      { "interact.user_code": code },
      (err: Error, transaction: mongoose.Document) => {
        if (err) {
          return err;
        } else {
          return transaction;
        }
      }
    );
  }
}

export default new DataController();
