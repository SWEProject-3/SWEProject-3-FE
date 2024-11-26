import { API_LIKE } from '@/constants/API';

import instance from './instance';

export const postLike = (eventId) => {
  return instance({
    url: API_LIKE.LIKE(eventId),
    method: 'POST',
  });
};

export const deleteLike = (eventId) => {
  return instance({
    url: API_LIKE.LIKE(eventId),
    method: 'DELETE',
  });
};
