import { API_COMMENT } from '@/constants/API';

import instance from './instance';

export const getComments = (eventId, page) => {
  return instance({
    url: API_COMMENT.COMMENT(eventId),
    method: 'GET',
    params: { page },
  });
};

export const postComment = (eventId, content) => {
  return instance({
    url: API_COMMENT.COMMENT(eventId),
    method: 'POST',
    data: { content },
  });
};

export const putComment = (commentId, content) => {
  return instance({
    url: API_COMMENT.COMMENT_DETAIL(commentId),
    method: 'PUT',
    data: { content },
  });
};

export const deleteComment = (commentId) => {
  return instance({
    url: API_COMMENT.COMMENT_DETAIL(commentId),
    method: 'DELETE',
  });
};
