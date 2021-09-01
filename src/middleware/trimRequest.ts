import { NextFunction, Request, Response } from 'express';

function postTrimmer(req: Request, res: Response, next: NextFunction) {
  if (req.method === 'POST' || req.method === 'PUT') {
    Object.keys(req.body).map(
      (k) =>
        (req.body[k] =
          typeof req.body[k] == 'string' ? req.body[k].trim() : req.body[k])
    );
  }
  next();
}

export default postTrimmer;
