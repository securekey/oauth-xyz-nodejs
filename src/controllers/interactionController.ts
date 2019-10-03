import { Request, Response } from 'express';
import { Handle } from '../models/handleModel';
import dataController from './dataController';
import { TransactionModel } from '../models/transactionModel';
import { UserModel } from '../models/userModel';
import utils from '../utils/utils';
import { sha3_512 } from 'js-sha3';
class InteractionController {
  public async getInteract(req: Request, res: Response) {
    res.render('interact', {
      title: 'Hello there!',
      message: 'Authorization Request',
      para: 'Do you agree to authorize Client XYZ on your behalf?'
    });
  }

  public async postInteractApprove(req: Request, res: Response) {
    var tx: any;

    console.log(req.cookies);
    if (req.cookies.pending_approval) {
      try {
        var transaction = await dataController.getTransactionByObject(
          req.cookies.pending_approval
        );
        if (!transaction) {
          return res.status(400).send({
            message: 'Invalid cookie. Please clear your cookies and try again'
          });
        } else {
          tx = transaction;
        }
      } catch (err) {
        return res.status(500).send(err);
      }
      if (tx) {
        tx.interact.interact_id = null;
        tx.interact.url = null;

        if (req.body.approved) {
          tx.status = 'authorized';
          var user = new UserModel({ id: req.session.id });
          tx.user = user;
        } else {
          tx.status = 'denied';
          // TODO: maybe save and return here?
        }

        switch (tx.interact.type) {
          case 'device':
            await tx.save();
            return res.send({ approved: true });
          case 'redirect':
            let interact_handle = utils.generateRandomString(30);
            tx.interact.interact_handle = interact_handle;

            let client_nonce = tx.interact.client_nonce;
            let server_nonce = tx.interact.server_nonce;
            let hash = sha3_512(
              [client_nonce, server_nonce, interact_handle].join('\n')
            );
            let callback = tx.interact.callback;
            let callbackUri =
              callback + '?hash=' + hash + '&interact=' + interact_handle;

            await tx.save();
            return res.redirect(callbackUri);
          default:
            await tx.save();
            return res.send({ approved: false });
        }
      } else {
        return res.status(404);
      }
    } else {
      return res
        .status(500)
        .send("Hmmm.. looks like you're not supposed to be here");
    }
  }

  public async getInteractDevice(req: Request, res: Response) {
    res.send('Device GET');
  }

  public async postInteractDevice(req: Request, res: Response) {
    res.send('device POST');
  }

  public async getInteractId(req: Request, res: Response) {
    var tx: any;
    var id = req.params.id;

    try {
      var transaction = await dataController.getTransactionByInteractId(id);
      tx = transaction;
    } catch (err) {
      return res.status(500).send(err);
    }

    if (tx) {
      res.cookie('pending_approval', tx.toObject());
    }

    return res.redirect('/interact');
  }

  public async getTesting(req: Request, res: Response) {
    res.send(req.cookies);
  }

  public async getTestingClear(req: Request, res: Response) {
    res.clearCookie('test').send('cookie cleared');
  }
}

export default new InteractionController();
