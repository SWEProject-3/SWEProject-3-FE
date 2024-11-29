import { API_FEED_SORTING } from '@/constants/API';

import instance from './instance';

export const getFeedSorting = (page, query = '일정', sort = 'latest') => {
  return instance({
    url: API_FEED_SORTING.FEED_SORTING,
    method: 'GET',
    params: {
      page,
      query,
      sort,
    },
  });
};
