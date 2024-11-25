import { API_DEPARTMENT } from '@/constants/API';

import instance from './instance';

export const getDepartments = () => {
  return instance({
    url: API_DEPARTMENT.DEPARTMENT,
    method: 'GET',
  });
};

//유저가 구독한 학과 조회
export const getSubscribedDepartments = (query, page, userId) => {
  const params = {};
  if (query) params.query = query;
  if (page) params.page = page;
  return instance({
    url: API_DEPARTMENT.SUBSCRIBED_DEPARTMENTS(userId),
    method: 'GET',
    params,
  });
};
