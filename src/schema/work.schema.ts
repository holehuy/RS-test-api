import { object, string } from 'yup';
const payload = {
  body: object({
    title: string()
      .required('Title is required')
      .max(100, 'Title must be less than 100 characters')
      .min(8, 'Title must be more than 8 characters'),
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
