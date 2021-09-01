import {
  DocumentDefinition,
  FilterQuery,
  UpdateQuery,
  QueryOptions,
} from 'mongoose';
import Work, { WorkDocument } from '../model/work.model';
import log from '../logger';
import PAGINATION from '../constant/pagination.constant';

interface queryGetWork {
  page: string;
  limit: string;
  textSearch?: string;
  sort?: 'desc' | 'asc';
}

export function createWork(input: DocumentDefinition<WorkDocument>) {
  return Work.create(input);
}

export async function getManyWorks(query: queryGetWork) {
  try {
    const limit: number = parseInt(query.limit) || PAGINATION.LIMIT_DEFAULT;
    const page: number = parseInt(query.page) || PAGINATION.PAGE_DEFAULT;
    const textSearch: string = query.textSearch || '';
    const sort: string = query.sort || 'desc';
    if (textSearch) {
      const works = await Work.find({ $text: { $search: textSearch } })
        .limit(limit)
        .skip(limit * (page - 1));
      const count = await Work.countDocuments();
      const lastPage = Math.ceil(count / limit);
      return { count, lastPage, works };
    }
    const works = await Work.find()
      .limit(limit)
      .skip(limit * (page - 1))
      .sort({ createdAt: sort === 'desc' ? -1 : 1 });
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
