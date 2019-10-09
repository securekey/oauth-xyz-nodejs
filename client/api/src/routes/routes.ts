import { Request, Response } from 'express';

export class Routes {
  public routes(app): void {
    app.route('/').get((req: Request, res: Response) => {
      app.status(418).send({
        message: "I'm a teapot."
      });
    });

    app.route('/redirect').post();

    app.route('/device').post();

    app.route('/pending').get();

    app.route('/callback/:id').get();

    app.route('/poll/:id').get();
  }
}
