import { object, string } from 'yup';
const payload = {
  body: object({
    title: string().required('Title is required'),
  }),
};

const params = {
  params: object({
    workId: string().required('workId is required'),
  }),
};

export const createWorkSchema = object({
  ...payload,
});

export const updateWorkSchema = object({
  ...params,
  ...payload,
});

export const deleteWorkSchema = object({
  ...params,
});
