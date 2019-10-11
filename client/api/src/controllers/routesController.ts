import { Request, Response } from 'express';
import dataController from './dataController';
import utils from '../utils/utils';
import { sha3_512 } from 'js-sha3';
import * as request from 'request';
import {
  PendingTransactionModel,
  EntryModel
} from '../models/pendingTransaction';

const asTransactionURL = 'http://as:3000/transaction';
class RoutesController {
  public async postRedirect(req: Request, res: Response) {
    let callback_id = utils.generateRandomString(30);
    let nonce = utils.generateRandomString(20);
    let txRequest = {
      client: {
        name: 'XYZ Redirect Client',
        uri: 'http://localhost:5000'
      },
      interact: {
        callback: 'http://localhost:5000/callback/' + callback_id,
        type: 'redirect',
        nonce: nonce
      },
      resources: [
        {
          actions: ['read', 'write', 'dolphin'],
          locations: [
            'https://server.example.net/',
            'https://resource.local/other'
          ],
          data: ['metadata']
        },
        {
          actions: ['read'],
          locations: ['https://server.example.net/user'],
          data: ['email', 'name']
        }
      ],
      user: {
        assertion:
          'eyJraWQiOiIxZTlnZGs3IiwiYWxnIjoiUlMyNTYifQ.ewogImlzcyI6ICJodHRwOi8vc2VydmVyLmV4YW1wbGUuY29tIiwKICJzdWIiOiAiMjQ4Mjg5NzYxMDAxIiwKICJhdWQiOiAiczZCaGRSa3F0MyIsCiAibm9uY2UiOiAibi0wUzZfV3pBMk1qIiwKICJleHAiOiAxMzExMjgxOTcwLAogImlhdCI6IDEzMTEyODA5NzAsCiAibmFtZSI6ICJKYW5lIERvZSIsCiAiZ2l2ZW5fbmFtZSI6ICJKYW5lIiwKICJmYW1pbHlfbmFtZSI6ICJEb2UiLAogImdlbmRlciI6ICJmZW1hbGUiLAogImJpcnRoZGF0ZSI6ICIwMDAwLTEwLTMxIiwKICJlbWFpbCI6ICJqYW5lZG9lQGV4YW1wbGUuY29tIiwKICJwaWN0dXJlIjogImh0dHA6Ly9leGFtcGxlLmNvbS9qYW5lZG9lL21lLmpwZyIKfQ.rHQjEmBqn9Jre0OLykYNnspA10Qql2rvx4FsD00jwlB0Sym4NzpgvPKsDjn_wMkHxcp6CilPcoKrWHcipR2iAjzLvDNAReF97zoJqq880ZD1bwY82JDauCXELVR9O6_B0w3K-E7yM2macAAgNCUwtik6SjoSUZRcf-O5lygIyLENx882p6MtmwaL1hd6qn5RZOQ0TLrOYu0532g9Exxcm-ChymrB4xLykpDj3lUivJt63eEGGN6DH5K6o33TcxkIjNrCD4XB1CKKumZvCedgHHF3IAK4dVEDSUoGlH9z4pP_eWYNXvqQOjGs-rDaQzUHl6cQQWNiDpWOl_lxXjQEvQ',
        type: 'oidc_id_token'
      },
      key: {
        jwks: {
          keys: [
            {
              kty: 'RSA',
              e: 'AQAB',
              kid: 'xyz-1',
              alg: 'RS256',
              n:
                'kOB5rR4Jv0GMeLaY6_It_r3ORwdf8ci_JtffXyaSx8xYJCCNaOKNJn_Oz0YhdHbXTeWO5AoyspDWJbN5w_7bdWDxgpD-y6jnD1u9YhBOCWObNPFvpkTM8LC7SdXGRKx2k8Me2r_GssYlyRpqvpBlY5-ejCywKRBfctRcnhTTGNztbbDBUyDSWmFMVCHe5mXT4cL0BwrZC6S-uu-LAx06aKwQOPwYOGOslK8WPm1yGdkaA1uF_FpS6LS63WYPHi_Ap2B7_8Wbw4ttzbMS_doJvuDagW8A1Ip3fXFAHtRAcKw7rdI4_Xln66hJxFekpdfWdiPQddQ6Y1cK2U3obvUg7w'
            }
          ]
        }
      }
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
        let pendingTx = new PendingTransactionModel({
          entries: [newEntry],
          callback_id: callback_id,
          client_nonce: nonce,
          server_nonce: body.server_nonce,
          owner: req.sessionID
        });
        pendingTx.save();
      }
    );
    return res.sendStatus(204);
  }
  public async postDevice(req: Request, res: Response) {
    let txRequest = {
      client: {
        name: 'XYZ Device Client',
        uri: 'http://localhost:5000'
      },
      interact: {
        type: 'device'
      },
      resources: [
        {
          actions: ['read', 'write', 'dolphin'],
          locations: [
            'https://server.example.net/',
            'https://resource.local/other'
          ],
          data: ['metadata']
        },
        {
          actions: ['read'],
          locations: ['https://server.example.net/user'],
          data: ['email', 'name']
        }
      ],
      user: {
        assertion:
          'eyJraWQiOiIxZTlnZGs3IiwiYWxnIjoiUlMyNTYifQ.ewogImlzcyI6ICJodHRwOi8vc2VydmVyLmV4YW1wbGUuY29tIiwKICJzdWIiOiAiMjQ4Mjg5NzYxMDAxIiwKICJhdWQiOiAiczZCaGRSa3F0MyIsCiAibm9uY2UiOiAibi0wUzZfV3pBMk1qIiwKICJleHAiOiAxMzExMjgxOTcwLAogImlhdCI6IDEzMTEyODA5NzAsCiAibmFtZSI6ICJKYW5lIERvZSIsCiAiZ2l2ZW5fbmFtZSI6ICJKYW5lIiwKICJmYW1pbHlfbmFtZSI6ICJEb2UiLAogImdlbmRlciI6ICJmZW1hbGUiLAogImJpcnRoZGF0ZSI6ICIwMDAwLTEwLTMxIiwKICJlbWFpbCI6ICJqYW5lZG9lQGV4YW1wbGUuY29tIiwKICJwaWN0dXJlIjogImh0dHA6Ly9leGFtcGxlLmNvbS9qYW5lZG9lL21lLmpwZyIKfQ.rHQjEmBqn9Jre0OLykYNnspA10Qql2rvx4FsD00jwlB0Sym4NzpgvPKsDjn_wMkHxcp6CilPcoKrWHcipR2iAjzLvDNAReF97zoJqq880ZD1bwY82JDauCXELVR9O6_B0w3K-E7yM2macAAgNCUwtik6SjoSUZRcf-O5lygIyLENx882p6MtmwaL1hd6qn5RZOQ0TLrOYu0532g9Exxcm-ChymrB4xLykpDj3lUivJt63eEGGN6DH5K6o33TcxkIjNrCD4XB1CKKumZvCedgHHF3IAK4dVEDSUoGlH9z4pP_eWYNXvqQOjGs-rDaQzUHl6cQQWNiDpWOl_lxXjQEvQ',
        type: 'oidc_id_token'
      },
      key: {
        jwks: {
          keys: [
            {
              kty: 'RSA',
              e: 'AQAB',
              kid: 'xyz-1',
              alg: 'RS256',
              n:
                'kOB5rR4Jv0GMeLaY6_It_r3ORwdf8ci_JtffXyaSx8xYJCCNaOKNJn_Oz0YhdHbXTeWO5AoyspDWJbN5w_7bdWDxgpD-y6jnD1u9YhBOCWObNPFvpkTM8LC7SdXGRKx2k8Me2r_GssYlyRpqvpBlY5-ejCywKRBfctRcnhTTGNztbbDBUyDSWmFMVCHe5mXT4cL0BwrZC6S-uu-LAx06aKwQOPwYOGOslK8WPm1yGdkaA1uF_FpS6LS63WYPHi_Ap2B7_8Wbw4ttzbMS_doJvuDagW8A1Ip3fXFAHtRAcKw7rdI4_Xln66hJxFekpdfWdiPQddQ6Y1cK2U3obvUg7w'
            }
          ]
        }
      }
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
      let expectedHash = sha3_512(
        [pending.client_nonce, pending.server_nonce, req.query.interact].join(
          '\n'
        )
      );

      if (expectedHash === req.query.hash) {
        let lastEntry = pending.entries[pending.entries.length - 1];
        let lastResponse = lastEntry.response;
        let txRequest = {
          handle: lastResponse.handle.value,
          interact_handle: sha3_512(req.query.interact)
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

            return res.status(302).location('/');
          }
        );
      } else {
        return res.sendStatus(400);
      }
    } catch (err) {
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
      let txRequest = {
        handle: lastResponse.handle.value
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
