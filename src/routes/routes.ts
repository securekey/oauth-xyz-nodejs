import { Request, Response } from "express";
import { TransactionRequest } from "../models/txRequestModel";
import { TransactionResponse } from "../models/txResponseModel";

export class Routes {
  public routes(app): void {
    app.route("/").get((req: Request, res: Response) => {
      res.status(418).send({
        message: "I'm a teapot."
      });
    });

    app.route("/transaction").post((req: Request, res: Response) => {
      var txReq = new TransactionRequest(req.body);
      var txResp = new TransactionResponse();
      res.send(txResp);
    });

    app.route("/interact").get((req: Request, res: Response) => {
      res.render("interact", {
        title: "Hello there!",
        message: "How you doin?",
        para: "This is where we ask the user to approve or decline"
      });
    });

    app.route("/interact/approve").post((req: Request, res: Response) => {
      res.status(200).send({
        message: "Im not sure what happens here"
      });
    });

    app
      .route("/interact/device")
      .get((req: Request, res: Response) => {
        res.send("device GET");
      })
      .post((req: Request, res: Response) => {
        res.send("Device POST");
      });

    app.route("/interact/:id").get((req: Request, res: Response) => {
      res.status(200).send({
        message:
          "Interaction GET endpoint. ID: " +
          req.params.id +
          ". To be updated..."
      });
    });
  }
}
