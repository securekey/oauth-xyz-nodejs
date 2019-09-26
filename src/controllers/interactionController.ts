import { Request, Response } from "express";
import { Handle } from "../models/handleModel";

class InteractionController {
  public async getInteract(req: Request, res: Response) {
    res.render("interact", {
      title: "Hello there!",
      message: "Authorization Request",
      para: "Do you agree to authorize Client XYZ on your behalf?"
    });
  }

  public async postInteractApprove(req: Request, res: Response) {
    res.send(req.body);
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
