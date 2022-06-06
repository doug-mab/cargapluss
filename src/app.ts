import express, { Request, Response } from 'express';
import helmet from 'helmet';
import * as routes from './routes';

class App {
  public readonly app = express();

  constructor() {
    this.middlewares();
    this.routes();
  }

  private middlewares() {
    this.app.use(helmet());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }

  private routes() {
    this.app.use('/api', routes.storage);

    this.app.use('*', (req: Request, res: Response) => {
      return res
        .status(404)
        .send('<h2>Error 404</h2> The given path does not exist');
    });
  }
}

export default new App().app;
