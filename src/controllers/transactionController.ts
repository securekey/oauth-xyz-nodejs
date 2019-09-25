import { Request, Response } from "express";
import { TransactionRequest } from "../models/txRequestModel";
import { isNullOrUndefined, isError } from "util";
import dataController from "./dataController";
import { TransactionModel } from "../models/transactionModel";
import { Handle, HandleSet } from "../models/handleModel";

export class TransactionController {
  public async postTransaction(req: Request, res: Response) {
    var txReq = new TransactionRequest(req.body);
    var tx: any;

    if (txReq.handle !== null && txReq.handle !== undefined) {
      tx = await dataController.getTransactionByHandle(txReq.handle);

      console.log(tx);
      if (isError(tx)) {
        return res.status(404);
      }
    } else {
      tx = new TransactionModel();
      // If client request is object
      if (txReq.isClientRequestFull()) {
        tx.client = txReq.getClientDoc();
      } else {
        // Get client req from handle
        // Set it to tx.client
      }

      // If interact request is object
      if (txReq.isInteractRequestFull()) {
        tx.interact = txReq.getInteractDoc();
      } else {
        // Get interact req from handle
        // Set it to tx.interact
      }
    }

    if (
      !(
        tx.interact.interact_handle === null ||
        tx.interact.interact_handle === undefined
      )
    ) {
      if (!txReq.isInteractRequestFull()) {
        if (txReq.interact === null || txReq.interact === undefined) {
          return res.status(400).send("Missing interaction handle");
        }

        if (txReq.interact !== "testing123") {
          return res.status(400).send("Invalid interaction handle");
        }
      }
    }

    // Rotate the TX Handle
    tx.handles = new HandleSet({
      transaction: new Handle().toSchema()
    });

    switch (tx.status) {
      case "authorized":
        tx.status = "issued";
        tx.access_token = new Handle().toSchema();
        break;
      case "issued":
        // refresh token?
        tx.save();
        return res.status(403).send("already issued");
      case "waiting":
        tx.save();
        return res.status(202).send("wait");
      case "denied":
        tx.save();
        return res.send("User denied");
      case "new":
        tx.save();
        return res.send("something");
    }
  }
}
