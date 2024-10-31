import { API_DEPARTMENT } from '@/constants/API';

import instance from './instance';

export const getDepartments = () => {
  return instance({
    url: API_DEPARTMENT.DEPARTMENT,
    method: 'GET',
  });
};
