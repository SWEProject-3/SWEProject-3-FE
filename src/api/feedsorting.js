import { API_FEED_SORTING } from '@/constants/API';

import instance from './instance';

export const getFeedSorting = (page = 0, query = '일정', sort = 'latest') => {
  return instance({
    url: API_FEED_SORTING.FEED_SORTING(sort, query, page),
    method: 'GET',
  });
};
