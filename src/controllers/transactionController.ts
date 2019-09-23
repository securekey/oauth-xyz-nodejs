import { TransactionModel } from "../models/transactionModel";

export class TransactionController {
  public getTransactionWithHandle(handle: String) {
    TransactionModel.findOne(
      { "handles.transaction.value": handle },
      (err, transaction) => {
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
      (err, transaction) => {
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
      (err, transaction) => {
        if (err) {
          return err;
        } else {
          return transaction;
        }
      }
    );
  }
}
