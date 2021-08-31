import { Express, Request, Response } from 'express';
import {
  createWorkHandler,
  deleteWorkHandler,
  getManyWorksHandler,
  getOneWorkHandler,
  updateWorkHandler,
} from './controller/work.controller';
import { validateRequest } from './middleware';
import {
  createWorkSchema,
  updateWorkSchema,
  deleteWorkSchema,
} from './schema/work.schema';
export default function (app: Express) {
  app.get('/healthcheck', (req: Request, res: Response) => {
    res.sendStatus(200);
  });

  //create a work todo
  app.post(
    '/api/v1/works',
    validateRequest(createWorkSchema),
    createWorkHandler
  );

  //read many works
  app.get('/api/v1/works', getManyWorksHandler);

  //read one work
  app.get('/api/v1/works/:workId', getOneWorkHandler);
  //update work

  app.put('/api/v1/works/:workId',validateRequest(updateWorkSchema),updateWorkHandler)
  //delete work
  app.delete(
    '/api/v1/works/:workId',
    validateRequest(deleteWorkSchema),
    deleteWorkHandler
  );
}
