/*
Copyright SecureKey Technologies Inc. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0
*/
import { Request, Response } from 'express';
import dataController from './dataController';
import { sha3_512 } from 'js-sha3';
import base64url from 'base64url';
import * as request from 'request';
import {
  PendingTransactionModel,
  EntryModel
} from '../models/pendingTransaction';

const asTransactionURL = 'http://as:3000/transaction';

const sha3_512_encode = function(toHash: string) {
  return base64url.fromBase64(Buffer.from(sha3_512(toHash), 'hex').toString('base64'));    
}

class RoutesController {
  public async postRedirect(req: Request, res: Response) {
    let bodyTx = JSON.stringify(req.body.data.tx);
    let callback_url = req.body.data.tx.interact.callback.uri;
    let pieces = callback_url.split('/');
    let callback_id = pieces[pieces.length - 1];
    let nonce = req.body.data.tx.interact.callback.nonce;
    request.post(
      {
        url: asTransactionURL,
        body: bodyTx,
        headers: { 'Content-Type': 'application/json' }
      },
      (err, resp, body) => {
        if (err) {
          return res.status(500).send(err);
        }
        let newEntry = new EntryModel({
          request: bodyTx,
          response: JSON.parse(body)
        });
        let pendingTx = new PendingTransactionModel({
          entries: [newEntry],
          callback_id: callback_id,
          client_nonce: nonce,
          server_nonce: JSON.parse(body).server_nonce,
          owner: req.sessionID
        });
        pendingTx.save();
      }
    );
    return res.sendStatus(204);
  }
  public async postDevice(req: Request, res: Response) {
    let bodyTx = JSON.stringify(req.body.data.tx);

    request.post(
      {
        url: asTransactionURL,
        body: bodyTx,
        headers: { 'Content-Type': 'application/json' }
      },
      (err, resp, body) => {
        if (err) {
          return res.status(500).send(err);
        }

        let newEntry = new EntryModel({
          request: bodyTx,
          response: JSON.parse(body)
        });
        let pendingTx = new PendingTransactionModel({
          entries: [newEntry],
          owner: req.sessionID
        });
        pendingTx.save();
      }
    );
    return res.sendStatus(204);
  }
  public async getPending(req: Request, res: Response) {
    try {
      var pendingTxs = await dataController.getTransactionsByOwner(
        req.sessionID
      );
      return res.send(pendingTxs);
    } catch (err) {
      return res.status(500).send(err);
    }
  }
  public async postClear(req: Request, res: Response) {
    try {
      await dataController.clearAllTransactions();
      return res.sendStatus(200);
    } catch (err) {
      return res.status(500).send(err);
    }
  }
  public async getCallbackId(req: Request, res: Response) {
    let callback_id = req.params.id;
    try {
      let pending = await dataController.getTransactionByCallbackIdAndOwner(
        callback_id,
        req.sessionID
      );
      if (!pending) {
        return res.sendStatus(404);
      }
      let expectedHash = sha3_512_encode(
        [
          pending.toObject().client_nonce,
          pending.toObject().server_nonce,
          req.query.interact
        ].join('\n')
      );
      if (expectedHash === req.query.hash) {
        let lastEntry = pending.entries[pending.entries.length - 1];
        let lastResponse = lastEntry.response;
        let txRequest = {
          handle: lastResponse.handle.value,
          interact_handle: sha3_512_encode(req.query.interact)
        };

        request.post(
          {
            url: asTransactionURL,
            body: JSON.stringify(txRequest),
            headers: { 'Content-Type': 'application/json' }
          },
          (err, resp, body) => {
            if (err) {
              return res.status(500).send(err);
            }
            let newEntry = new EntryModel({
              request: txRequest,
              response: JSON.parse(body)
            });
            pending.entries.push(newEntry);
            pending.save();
            return res.location('http://localhost:5000').sendStatus(302);
          }
        );
      } else {
        return res.status(400).send('Bad hash, expected ' + expectedHash + ' got ' + req.query.hash);
      }
    } catch (err) {
      console.log(err);
      return res.status(500).send(err);
    }
  }
  public async getPollId(req: Request, res: Response) {
    try {
      let pending = await dataController.getTransactionByIdAndOwner(
        req.params.id,
        req.sessionID
      );
      if (!pending) {
        return res.sendStatus(404);
      }

      let lastEntry = pending.entries[pending.entries.length - 1];
      let lastResponse = lastEntry.response;
      let lastRequest = lastEntry.request;
      let txRequest = {
        handle: lastResponse.handle.value,
        interact_handle: lastRequest.interact_handle
          ? lastRequest.interact_handle
          : null
      };
      request.post(
        {
          url: asTransactionURL,
          body: JSON.stringify(txRequest),
          headers: { 'Content-Type': 'application/json' }
        },
        (err, resp, body) => {
          if (err) {
            return res.status(500).send(err);
          }

          let newEntry = new EntryModel({
            request: txRequest,
            response: JSON.parse(body)
          });

          pending.entries.push(newEntry);
          pending.save();

          return res.status(200).send(pending);
        }
      );
    } catch (err) {
      return res.status(500).send(err);
    }
  }
}

export default new RoutesController();
