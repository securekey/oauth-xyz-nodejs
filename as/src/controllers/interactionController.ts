import { Request, Response } from 'express';
import dataController from './dataController';
import utils from '../utils/utils';
import { sha3_512 } from 'js-sha3';
class InteractionController {
  public async getInteract(req: Request, res: Response) {
    var tx: any;

    if (req.cookies.pending_approval) {
      if (req.cookies.pending_approval.requireCode) {
        return res.render('interact', {
          title: 'Hello there',
          message: 'User Code',
          para: 'Submit your User Code to continue',
          user: true
        });
      } else {
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
            return res.render('interact', {
              title: 'Hello there!',
              message: 'Authorization Request',
              para: 'Do you agree to authorize Client XYZ on your behalf?',
              resources: tx.resources
            });
          }
        } catch (err) {
          return res.status(500).send(err);
        }
      }
    } else {
      return res
        .status(400)
        .send({ message: "Hmmm... Looks like you're not supposed to be here" });
    }
  }

  public async postInteractApprove(req: Request, res: Response) {
    var tx: any;

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

      res.clearCookie('pending_approval');

      if (tx) {
        tx.interact.interact_id = null;
        tx.interact.url = null;

        if (req.body.approved === 'true') {
          tx.status = 'authorized';
        } else {
          tx.status = 'denied';
        }

        switch (tx.interact.type) {
          case 'device':
            await tx.save();
            return res.send('Go back to your device to continue');
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
            return res.send('Something went wrong...');
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
    res.cookie('pending_approval', { requireCode: true });
    return res.redirect('/interact');
  }

  public async postInteractDevice(req: Request, res: Response) {
    var tx: any;

    if (req.cookies.pending_approval) {
      var userCode = req.body.userCode;

      // normalize the user code
      userCode = userCode.replace('l', '1');
      userCode = userCode.toUpperCase();
      userCode = userCode.replace('0', 'O');
      userCode = userCode.replace('I', '1');
      userCode = userCode.replace(
        new RegExp('[^123456789ABCDEFGHJKLMNOPQRSTUVWXYZ]'),
        ''
      );

      try {
        var transaction = await dataController.getTransactionByUserCode(
          userCode
        );
        if (!transaction) {
          return res.status(400).send('Invalid user code');
        }

        tx = transaction;
      } catch (err) {
        return res.status(500).send(err);
      }

      if (tx) {
        tx.interact.user_code = null;
        tx.interact.url = null;
        res.clearCookie('pending_approval');
        res.cookie('pending_approval', tx.toObject());
        await tx.save();
        return res.status(204).redirect('/interact');
      }
    } else {
      return res
        .status(400)
        .send({ message: "Hmmm... Looks like you're not supposed to be here" });
    }
  }

  public async getInteractId(req: Request, res: Response) {
    var tx: any;
    var id = req.params.id;

    try {
      var transaction = await dataController.getTransactionByInteractId(id);
      if (!transaction) {
        return res.status(400).send('Invalid Interact ID');
      }
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
