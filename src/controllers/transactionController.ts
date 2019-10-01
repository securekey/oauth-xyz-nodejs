import { Request, Response } from 'express';
import { TransactionRequest } from '../models/txRequestModel';
import { TransactionResponse } from '../models/txResponseModel';
import { TransactionModel } from '../models/transactionModel';
import { Handle, HandleSet } from '../models/handleModel';
import utils from '../utils/utils';
import dataController from './dataController';
import { sha3_512 } from 'js-sha3';
import { ClientModel } from '../models/clientModel';

class TransactionController {
  public async postTransaction(req: Request, res: Response) {
    var txReq = new TransactionRequest(req.body);
    var tx: any;

    // If the transaction request carries a transaction handle
    if (txReq.handle) {
      // Try to get the referenced TX from the database
      try {
        var transaction = await dataController.getTransactionByHandle(
          txReq.handle
        );
        if (!transaction) {
          return res
            .status(400)
            .send({ message: 'Invalid transaction handle' });
        } else {
          tx = transaction;
        }
      } catch (err) {
        return res.status(500).send(err);
      }
    } else {
      // New TX Request coming in
      tx = new TransactionModel();

      // If client request is full object (not handle)
      if (txReq.isClientRequestFull()) {
        tx.client = txReq.getClientDoc();
      } else if (txReq.client) {
        try {
          var client = await dataController.getClientByHandle(<string>(
            txReq.client
          ));
          if (!client) {
            return res.status(400).send({ message: 'Invalid client handle' });
          } else {
            tx.client = client;
          }
        } catch (err) {
          return res.status(500).send(err);
        }
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
            return res.status(400).send('Missing interaction handle');
          }

          if (txReq.interact !== sha3_512(tx.interact.interact_handle)) {
            return res.status(400).send('Invalid interaction handle');
          }
        }
      }

      // Rotate the TX Handle
      if (tx.handles) {
        tx.handles.transaction = new Handle().toSchema();
      } else {
        tx.handles = new HandleSet({
          transaction: new Handle().toSchema()
        });
      }

      if (tx.client) {
        if (!tx.handles.client) {
          let h = new Handle();
          let c = new ClientModel({
            handle: h.value,
            name: tx.client.name,
            uri: tx.client.uri,
            logo_uri: tx.client.logo_uri
          });
          tx.handles.client = h;
          await c.save();
        }
      }

      switch (tx.status) {
        case 'authorized':
          tx.status = 'issued';
          tx.access_token = new Handle().toSchema();
          break;
        case 'issued':
          // refresh token?
          await tx.save();
          return res.status(403).send({
            message:
              'An Access Token has already been issued for this transaction'
          });
        case 'waiting':
          await tx.save();
          return res
            .status(202)
            .send({ message: 'Transaction waiting, try again later...' });
        case 'denied':
          await tx.save();
          return res.send({
            message: 'User denied authorization during interaction'
          });
        case 'new':
          if (tx.interact && tx.interact.type) {
            switch (tx.interact.type) {
              case 'redirect':
                let interact_id = utils.generateRandomString(10);
                let server_nonce = utils.generateRandomString(20);
                let interaction_url =
                  'https://localhost:3000/interact/' + interact_id;

                tx.interact.url = interaction_url;
                tx.interact.interact_id = interact_id;
                tx.interact.server_nonce = server_nonce;

                tx.status = 'waiting';

                break;
              case 'device':
                let user_code = utils.generateUserCode(8);
                let user_code_url = 'http://localhost:3000/interact/device';

                tx.interact.user_code = user_code;
                tx.interact.user_code_url = user_code_url;

                tx.status = 'waiting';
                break;
              default:
                return res.status(400);
            }
          }
          break;
        default:
          return res.status(500);
      }

      await tx.save();
      let txResp = new TransactionResponse(tx);
      return res.json(txResp);
    }
  }
}

export default new TransactionController();
