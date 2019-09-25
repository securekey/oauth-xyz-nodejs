import { Request, Response } from "express";
import { Handle } from "../models/handleModel";

class InteractionController {
  public async getInteract(req: Request, res: Response) {
    res.render("interact", {
      title: "Hello there!",
      message: "How you doin?",
      para: "This is where we ask the user to approve or decline" + req.cookies
    });
  }

  public async postInteractApprove(req: Request, res: Response) {
    res.send({
      message:
        "User has approved the transaction. Data will be shared and access Token is granted",
      token: new Handle()
    });
  }

  public async getInteractDevice(req: Request, res: Response) {
    res.send("Device GET");
  }

  public async postInteractDevice(req: Request, res: Response) {
    res.send("device POST");
  }

  public async getInteractId(req: Request, res: Response) {
    res.cookie("test", "works").redirect("/interact");
  }

  public async getTesting(req: Request, res: Response) {
    res.send(req.cookies);
  }

  public async getTestingClear(req: Request, res: Response) {
    res.clearCookie("test").send("cookie cleared");
  }
}

export default new InteractionController();
