import instance from './instance';

import { API_AUTH } from '@/constants/API';

export const postRegister = (email, password, name) => {
  return instance({
    url: API_AUTH.REGISTER,
    method: 'POST',
    data: {
      email,
      password,
      name,
    },
  });
};

export const postLogin = (email, password) => {
  return instance({
    url: API_AUTH.LOGIN,
    method: 'POST',
    data: {
      email,
      password,
    },
  });
};
