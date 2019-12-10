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
import * as jose from 'node-jose';

const asTransactionURL = 'http://localhost:3000/transaction';
// const asTransactionURL = 'http://host.docker.internal:9834/api/as/transaction';

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
    let headers = { 'Content-Type': 'application/json' };
    if (req.body.data.tx.keys) {
      if (req.body.data.tx.keys.proof == 'jwsd') {
        
        var jwsdHeader = await jose.JWK.asKeyStore([req.body.data.key])
        // parse the key
        .then(keystore => {
          const key = keystore.get(req.body.data.key.kid);
          console.log(key);
          return jose.JWS.createSign({format: 'compact', fields: { b64: false }}, key)
            .update(bodyTx)
            .final()
        })
        .then(jws => {
          // split the JWS to grab the header and signature
          console.log(jws);
          const parts = jws.split('.');
          parts[1] = '';
          return parts.join('.');
        });
        
        headers['Detached-JWS'] = jwsdHeader;
      }
    }
    
    console.log(headers);
    
    request.post(
      {
        url: asTransactionURL,
        body: bodyTx,
        headers: headers
      },
      (err, resp, body) => {
        if (err) {
          return res.status(500).send(err);
        }
        let newEntry = new EntryModel({
          key: req.body.data.key,
          proof: req.body.data.tx.keys.proof,
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
        return res.sendStatus(204);
      }
    );
  }
  public async postDevice(req: Request, res: Response) {
    let bodyTx = JSON.stringify(req.body.data.tx);

    let headers = { 'Content-Type': 'application/json' };
    if (req.body.data.tx.keys) {
      if (req.body.data.tx.keys.proof == 'jwsd') {
        
        var jwsdHeader = await jose.JWK.asKeyStore([req.body.data.key])
        // parse the key
        .then(keystore => {
          const key = keystore.get(req.body.data.key.kid);
          console.log(key);
          return jose.JWS.createSign({format: 'compact', fields: { b64: false }}, key)
            .update(bodyTx)
            .final()
        })
        .then(jws => {
          // split the JWS to grab the header and signature
          console.log(jws);
          const parts = jws.split('.');
          parts[1] = '';
          return parts.join('.');
        });
        
        headers['Detached-JWS'] = jwsdHeader;
      }
    }
    
    console.log(headers);

    request.post(
      {
        url: asTransactionURL,
        body: bodyTx,
        headers: headers
      },
      (err, resp, body) => {
        if (err) {
          return res.status(500).send(err);
        }

        let newEntry = new EntryModel({
          key: req.body.data.key,
          proof: req.body.data.tx.keys.proof,
          request: bodyTx,
          response: JSON.parse(body)
        });
        let pendingTx = new PendingTransactionModel({
          entries: [newEntry],
          owner: req.sessionID
        });
        pendingTx.save();
        return res.sendStatus(204);
      }
    );
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
        let bodyTx = JSON.stringify(txRequest);
        let headers = { 'Content-Type': 'application/json' };
        if (lastEntry.key) {
          if (lastEntry.proof == 'jwsd') {
        
            var jwsdHeader = await jose.JWK.asKeyStore([lastEntry.key])
            // parse the key
            .then(keystore => {
              const key = keystore.get(lastEntry.key.kid);
              console.log(key);
              return jose.JWS.createSign({format: 'compact', fields: { b64: false }}, key)
                .update(bodyTx)
                .final()
            })
            .then(jws => {
              // split the JWS to grab the header and signature
              console.log(jws);
              const parts = jws.split('.');
              parts[1] = '';
              return parts.join('.');
            });
        
            headers['Detached-JWS'] = jwsdHeader;
          }
        }

        request.post(
          {
            url: asTransactionURL,
            body: bodyTx,
            headers: headers
          },
          (err, resp, body) => {
            if (err) {
              return res.status(500).send(err);
            }
            let newEntry = new EntryModel({
              key: lastEntry.key,
              proof: lastEntry.proof,
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
      let bodyTx = JSON.stringify(txRequest);
      let headers = { 'Content-Type': 'application/json' };
      if (lastEntry.key) {
        if (lastEntry.proof == 'jwsd') {
        
          var jwsdHeader = await jose.JWK.asKeyStore([lastEntry.key])
          // parse the key
          .then(keystore => {
            const key = keystore.get(lastEntry.key.kid);
            console.log(key);
            return jose.JWS.createSign({format: 'compact', fields: { b64: false }}, key)
              .update(bodyTx)
              .final()
          })
          .then(jws => {
            // split the JWS to grab the header and signature
            console.log(jws);
            const parts = jws.split('.');
            parts[1] = '';
            return parts.join('.');
          });
        
          headers['Detached-JWS'] = jwsdHeader;
        }
      }
      request.post(
        {
          url: asTransactionURL,
          body: bodyTx,
          headers: headers
        },
        (err, resp, body) => {
          if (err) {
            return res.status(500).send(err);
          }

          let newEntry = new EntryModel({
            key: lastEntry.key,
            proof: lastEntry.proof,
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
