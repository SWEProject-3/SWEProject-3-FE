import { API_DEPARTMENT } from '@/constants/API';

import instance from './instance';

export const getDepartments = () => {
  return instance({
    url: API_DEPARTMENT.DEPARTMENT,
    method: 'GET',
  });
};

export const postDepartment = (departmentId) => {
  return instance({
    url: API_DEPARTMENT.SUBSCRIBE(departmentId),
    method: 'POST',
  });
};

export const deleteDepartment = (departmentId) => {
  return instance({
    url: API_DEPARTMENT.SUBSCRIBE(departmentId),
    method: 'DELETE',
  });
};
