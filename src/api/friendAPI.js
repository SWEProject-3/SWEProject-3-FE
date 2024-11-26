import { API_FRIEND } from '@/constants/API';

import instance from './instance';

export const getFriend = () => {
  return instance({
    url: API_FRIEND.FRIEND,
    method: 'GET',
  });
};

export const getFriendRequestReceived = () => {
  return instance({
    url: API_FRIEND.FRIENDRECEIVED,
    method: 'GET',
  });
};

export const putFriendAccept = (friendshipId, accept) => {
  return instance({
    url: API_FRIEND.FRIENDACCEPT(friendshipId),
    method: 'PUT',
    params: { accept },
  });
};

export const deleteFriend = (friendshipId) => {
  return instance({
    url: API_FRIEND.FRIENDDELETE(friendshipId),
    method: 'DELETE',
  });
};

export const postFriendRequest = (email) => {
  return instance({
    url: API_FRIEND.FRIENDREQUEST,
    method: 'POST',
    data: { email },
  });
};
