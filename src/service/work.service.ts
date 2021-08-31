import {
  DocumentDefinition,
  FilterQuery,
  UpdateQuery,
  QueryOptions,
} from 'mongoose';
import Work, { WorkDocument } from '../model/work.model';
import log from '../logger';

export function createWork(input: DocumentDefinition<WorkDocument>) {
  return Work.create(input);
}

export async function getManyWorks(query: { page: string; limit: string }) {
  try {
    const limit: number = parseInt(query.limit) || 10;
    const page: number = parseInt(query.page) || 1;
    const works = await Work.find()
      .limit(limit)
      .skip(limit * (page - 1))
      .sort({ createdAt: -1 });
    const count = await Work.countDocuments();
    const lastPage = Math.ceil(count / limit);
    return { count, lastPage, works };
  } catch (error: any) {
    log.error(error.message);
  }
}

export async function findWork(workId: string) {
  return await Work.findById(workId);
}

export async function findAndUpdate(
  query: FilterQuery<WorkDocument>,
  update: UpdateQuery<WorkDocument>,
  options: QueryOptions
) {
  return await Work.findOneAndUpdate(query, update, options);
}
export async function deleteWork(workId: string) {
  return await Work.deleteOne({ _id: workId });
}
