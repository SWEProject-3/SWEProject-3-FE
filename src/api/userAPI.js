import instance from './instance';
import { API_USER } from '@/constants/API';

export const deleteUser = (password) => {
  return instance({
    url: API_USER.WITHDRAW,
    method: 'DELETE',
    data: { password },
  });
};

export const getProfile = (userId) => {
  return instance({
    url: API_USER.PROFILE(userId),
    method: 'GET',
  });
};

export const editName = (name) => {
  return instance({
    url: API_USER.EDIT_NAME,
    method: 'PUT',
    data: { name },
  });
};
