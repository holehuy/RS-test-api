import { Request, Response } from 'express';
import {
  createWork,
  deleteWork,
  findAndUpdate,
  findWork,
  getManyWorks,
} from '../service/work.service';
export async function createWorkHandler(req: Request, res: Response) {
  const body = req.body;
  const work = await createWork({ ...body });
  return res.send(work);
}

export async function getManyWorksHandler(req: Request, res: Response) {
  const query: any = req.query;
  const listWorks = await getManyWorks(query);
  return res.send(listWorks);
}

export async function getOneWorkHandler(req: Request, res: Response) {
  const workId: string = req.params.workId;
  const work = await findWork(workId);
  if (!work) {
    return res.sendStatus(404);
  }

  return res.send(work);
}

export async function updateWorkHandler(req: Request, res: Response) {
  const workId: string = req.params.workId;
  const work = await findWork(workId);
  const update = req.body;
  if (!work) {
    return res.sendStatus(404);
  }

  const updateWork = await findAndUpdate({ _id: workId }, update, {
    new: true,
  });
  return res.send(updateWork);
}
export async function deleteWorkHandler(req: Request, res: Response) {
  const workId: string = req.params.workId;
  const work = await findWork(workId);
  if (!work) {
    return res.sendStatus(404);
  }

  await deleteWork(workId);
  return res.sendStatus(200);
}
