import express from 'express';
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
  }
}

export default new App().app;
