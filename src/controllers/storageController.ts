import { Request, Response } from 'express';
// import { logger } from '../util/logger';

class StorageController {
  index(req: Request, res: Response) {
    res.json({
      data: 'hey',
    });
  }
}

export default new StorageController();
