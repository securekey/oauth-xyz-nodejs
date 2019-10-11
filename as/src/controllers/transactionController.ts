import { Request, Response } from 'express';
import { TransactionRequest } from '../models/txRequestModel';
import { TransactionResponse } from '../models/txResponseModel';
import { TransactionModel } from '../models/transactionModel';
import { Handle, HandleSet } from '../models/handleModel';
import utils from '../utils/utils';
import dataController from './dataController';
import { sha3_512 } from 'js-sha3';
import { ClientModel } from '../models/clientModel';
import { UserRequestModel } from '../models/userModel';
import { KeyModel } from '../models/keyModel';
import { ResourcesModel } from '../models/resourcesModel';

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
        let h = new Handle();
        let c = new ClientModel({
          handle: h.value,
          name: tx.client.name,
          uri: tx.client.uri,
          logo_uri: tx.client.logo_uri
        });
        await c.save();
        tx.client = c;
        if (tx.handles) {
          tx.handles.client = h;
        } else {
          tx.handles = new HandleSet({
            client: h
          });
        }
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
        tx.key = txReq.getKeyDoc();
        let h = new Handle();
        let k = new KeyModel({
          handle: h.value,
          jwks: tx.key.jwks,
          cert: tx.key.cert,
          did: tx.key.did
        });
        await k.save();
        tx.key = k;
        if (tx.handles) {
          tx.handles.key = h;
        } else {
          tx.handles = new HandleSet({
            key: h
          });
        }
      } else if (txReq.key) {
        try {
          var key = await dataController.getKeyByHandle(<string>txReq.key);
          if (!key) {
            return res.status(400).send({ message: 'Invalid key handle' });
          } else {
            tx.key = key;
          }
        } catch (err) {
          return res.status(500).send(err);
        }
      }
    }

    if (tx) {
      // If tx in database has an interact handle
      if (tx.interact.interact_handle) {
        // if txReq.interact_handle is null or undefined
        if (!txReq.interact_handle) {
          return res.status(400).send('Missing interaction handle');
        }

        if (txReq.interact_handle !== sha3_512(tx.interact.interact_handle)) {
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
      if (tx.client && !tx.handles.client) {
        tx.handles.client = new Handle();
        tx.handles.client.value = tx.client.handle;
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
          if (tx.interact && tx.interact.type) {
            switch (tx.interact.type) {
              case 'redirect':
                let interact_id = utils.generateRandomString(10);
                let server_nonce = utils.generateRandomString(20);
                let interaction_url =
                  'http://localhost:3000/interact/' + interact_id;

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
