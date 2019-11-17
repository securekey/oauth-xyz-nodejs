/*
Copyright SecureKey Technologies Inc. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0
*/
import { Request, Response } from 'express';
import { TransactionRequest } from '../models/txRequestModel';
import { TransactionResponse } from '../models/txResponseModel';
import { TransactionModel } from '../models/transactionModel';
import { Handle, HandleSet } from '../models/handleModel';
import utils from '../utils/utils';
import dataController from './dataController';
import base64url from 'base64url';
import { sha3_512 } from 'js-sha3';
import { DisplayModel } from '../models/displayModel';
import { UserRequestModel } from '../models/userModel';
import { KeyModel } from '../models/keyModel';
import { ResourcesModel } from '../models/resourcesModel';
import * as jose from 'node-jose';

const sha3_512_encode = function(toHash: string) {
  return base64url.fromBase64(Buffer.from(sha3_512(toHash), 'hex').toString('base64'));    
}

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

      // If display request is full object (not handle)
      if (txReq.isDisplayRequestFull()) {
        tx.display = txReq.getDisplayDoc();
        let h = new Handle();
        let c = new DisplayModel({
          handle: h.value,
          name: tx.display.name,
          uri: tx.display.uri,
          logo_uri: tx.display.logo_uri
        });
        await c.save();
        tx.display = c;
        if (tx.handles) {
          tx.handles.display = h;
        } else {
          tx.handles = new HandleSet({
            display: h
          });
        }
      } else if (txReq.display) {
        try {
          var display = await dataController.getDisplayByHandle(<string>(
            txReq.display
          ));
          if (!display) {
            return res.status(400).send({ message: 'Invalid display handle' });
          } else {
            tx.display = display;
          }
        } catch (err) {
          return res.status(500).send(err);
        }
      }
      // If interact request is full object
      if (txReq.isInteractRequestFull()) {
        tx.interact = txReq.getInteractDoc();
      }
      
      if (txReq.isUserRequestFull()) {
        tx.user = txReq.getUserDoc();
        let h = new Handle();
        let u = new UserRequestModel({
          handle: h.value,
          assertion: tx.user.assertion,
          type: tx.user.type
        });
        await u.save();
        tx.user = u;
        if (tx.handles) {
          tx.handles.user = h;
        } else {
          tx.handles = new HandleSet({
            user: h
          });
        }
      } else if (txReq.user) {
        try {
          var user = await dataController.getUserByHandle(<string>txReq.user);
          if (!user) {
            return res.status(400).send({ message: 'Invalid user handle' });
          } else {
            tx.user = user;
          }
        } catch (err) {
          return res.status(500).send(err);
        }
      }
      
      if (txReq.resources) {
        for (var resource of txReq.resources) {
          if (typeof resource === 'string') {
            try {
              let r = await dataController.getResourceByHandle(resource);
              if (!r) {
                return res
                  .status(400)
                  .send({ message: 'Invalid resource handle: ' + resource });
              } else {
                tx.resources.push(...r.toObject().resources);
              }
            } catch (err) {
              return res.status(500).send(err);
            }
          } else {
            tx.resources.push(resource);
          }
        }
        let h = new Handle();
        let r = new ResourcesModel({
          handle: h.value,
          resources: tx.resources
        });
        tx.resources.handle = h.value;
        await r.save();
        if (tx.handles) {
          tx.handles.resource = h;
        } else {
          tx.handles = new HandleSet({
            resource: h
          });
        }
      }
      
      if (txReq.isKeyRequestFull()) {
        tx.keys = txReq.getKeyDoc();
        let h = new Handle();
        let k = new KeyModel({
          handle: h.value,
          jwk: tx.keys.jwk,
          cert: tx.keys.cert,
          did: tx.keys.did,
          proof: tx.keys.proof
        });
        await k.save();
        tx.keys = k;
        if (tx.handles) {
          tx.handles.key = h;
        } else {
          tx.handles = new HandleSet({
            key: h
          });
        }
      } else if (txReq.keys) {
        try {
          var keys = await dataController.getKeyByHandle(<string>txReq.keys);
          if (!keys) {
            return res.status(400).send({ message: 'Invalid key handle' });
          } else {
            tx.keys = keys;
          }
        } catch (err) {
          return res.status(500).send(err);
        }
      }
    }
    
    console.log(tx);
    
    if (tx) {
      
      // if the tx has a key proof, validate it
      if (tx.keys) {
        if (tx.keys.proof == 'jwsd') {
          // get the header
          const jwsdHeader = req.header('Detached-JWS');
          if (!jwsdHeader) {
            return res.status(400).send('Missing detached JWS header');
          }
          console.log(jwsdHeader);
          console.log(tx.keys.jwk);
          await jose.JWK.asKeyStore([tx.keys.jwk])
          .then(keystore => {
            console.log(keystore.all());
            const parts = jwsdHeader.split('.');
            parts[1] = base64url.encode(req['rawBody']);
            
            const input = parts.join('.');
            console.log(input);
            return jose.JWS.createVerify(keystore)
              .verify(input);
          })
          .then(result => {
            console.log('Verified detached JWS header');
          });
          
        }
      }
      
      
      // If tx in database has an interact handle
      if (tx.interact.interact_handle) {
        // if txReq.interact_handle is null or undefined
        if (!txReq.interact_handle) {
          return res.status(400).send('Missing interaction handle');
        }

        if (txReq.interact_handle !== sha3_512_encode(tx.interact.interact_handle)) {
          return res.status(400).send('Invalid interaction handle');
        }
      }

      if (tx.handles) {
        // Rotate TX Handle
        tx.handles.transaction = new Handle().toSchema();
      } else {
        tx.handles = new HandleSet({
          // Rotate TX Handle
          transaction: new Handle().toSchema()
        });
      }
      if (tx.display && !tx.handles.display) {
        tx.handles.display = new Handle();
        tx.handles.display.value = tx.display.handle;
      }
      if (tx.user && !tx.handles.user) {
        tx.handles.user = new Handle();
        tx.handles.user.value = tx.user.handle;
      }
      if (tx.key && !tx.handles.key) {
        tx.handles.key = new Handle();
        tx.handles.key.value = tx.key.handle;
      }
      if (tx.resources && !tx.handles.resource) {
        tx.handles.resource = new Handle();
        tx.handles.resource.value = tx.resources.handle;
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
            message: 'Access token has already been issued for this transaction'
          });
        case 'waiting':
          await tx.save();
          return res.status(202).json(new TransactionResponse(tx));
        case 'denied':
          await tx.save();
          return res
            .status(403)
            .send({ message: 'User denied approval for this transaction' });
        case 'new':
          if (tx.interact) {
            if (tx.interact.can_redirect) {
              let interact_id = utils.generateRandomString(10);
              let interaction_url =
                'http://localhost:3000/interact/' + interact_id;

              tx.interact.url = interaction_url;
              tx.interact.interact_id = interact_id;

            }
            
            if (tx.interact.callback) {
              let server_nonce = utils.generateRandomString(20);
              tx.interact.server_nonce = server_nonce;
            }
            
            if (tx.interact.can_user_code) {
              let user_code = utils.generateUserCode(8);
              let user_code_url = 'http://localhost:3000/interact/device';

              tx.interact.user_code = user_code;
              tx.interact.user_code_url = user_code_url;

            }
            
            tx.status = 'waiting';
            
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
