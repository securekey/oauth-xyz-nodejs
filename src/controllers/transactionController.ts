import { Request, Response } from "express";
import { TransactionRequest } from "../models/txRequestModel";
import { TransactionResponse } from "../models/txResponseModel";
import { TransactionModel } from "../models/transactionModel";
import { Handle, HandleSet } from "../models/handleModel";
import utils from "../utils/utils";
import dataController from "./dataController";
import { sha3_512 } from "js-sha3";

export class TransactionController {
  public async postTransaction(req: Request, res: Response) {
    var txReq = new TransactionRequest(req.body);
    var tx: any;

    // If the transaction request carries a transaction handle
    if (txReq.handle) {
      // Try to get the referenced TX from the database
      await dataController
        .getTransactionByHandle(txReq.handle)
        .then(transaction => {
          if (!transaction) {
            // If tx is undefined, it means no record found
            res.status(400).send("Invalid TX Handle");
            return;
          }

          tx = transaction;
        })
        .catch(err => {
          res.status(400).json(err);
          return;
        });
    } else {
      // New TX Request coming in
      tx = new TransactionModel();

      // If client request is full object (not handle)
      if (txReq.isClientRequestFull()) {
        tx.client = txReq.getClientDoc();
      } else {
        // Get client req from handle
        // Set it to tx.client
      }

      // If interact request is full object (not handle)
      if (txReq.isInteractRequestFull()) {
        tx.interact = txReq.getInteractDoc();
      } else {
        // Get interact req from handle
        // Set it to tx.interact
      }
    }

    if (tx) {
      // If tx in database has an interact handle
      if (tx.interact.interact_handle) {
        // if txReq doesnt have full interact object
        if (!txReq.isInteractRequestFull()) {
          // if txReq.interact is null or undefined
          if (!txReq.interact) {
            return res.status(400).send("Missing interaction handle");
          }

          if (txReq.interact !== sha3_512(tx.interact.interact_handle)) {
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
          if (tx.interact && tx.interact.type) {
            switch (tx.interact.type) {
              case "redirect":
                let interact_id = utils.generateRandomString(10);
                let server_nonce = utils.generateRandomString(20);
                let interaction_url =
                  "https://localhost:3000/interact/" + interact_id;

                tx.interact.url = interaction_url;
                tx.interact.interact_id = interact_id;
                tx.interact.server_nonce = server_nonce;

                tx.status = "waiting";

                break;
              case "device":
                let user_code = utils.generateUserCode(8);
                let user_code_url = "http://localhost:3000/interact/device";

                tx.interact.user_code = user_code;
                tx.interact.user_code_url = user_code_url;

                tx.status = "waiting";
                break;
              default:
                return res.status(400);
            }
          }
          break;
        default:
          return res.status(500);
      }

      tx.save();
      let txResp = new TransactionResponse(tx);
      res.json(txResp);
    }
  }
}
