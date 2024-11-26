import logininstance from './logininstance';
import instance from './instance';
import { API_AUTH } from '@/constants/API';

export const postRegister = (email, password, name) => {
  return logininstance({
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
  return logininstance({
    url: API_AUTH.LOGIN,
    method: 'POST',
    data: {
      email,
      password,
    },
  });
};

export const putPassword = ({ oldPassword, newPassword }) => {
  return instance({
    url: API_AUTH.PASSWORD,
    method: 'PUT',
    data: {
      oldPassword,
      newPassword,
    },
  });
};

export const getCheckToken = () => {
  return instance({
    url: API_AUTH.CHECK_TOKEN,
    method: 'GET',
  });
};
