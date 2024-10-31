import { API_CALENDER } from '@/constants/API';

import instance from './instance';

export const getCalendar = (userId, departmentId) => {
  const params = {};
  if (userId) params.userId = userId;
  if (departmentId) params.departmentId = departmentId;
  return instance({
    url: API_CALENDER.CALENDAR,
    method: 'GET',
    params,
  });
};

export const getCalendarDetail = (
  calendarId,
  rangeSearch,
  startDate,
  endDate,
  yearMonth
) => {
  const params = {};
  if (rangeSearch) params.rangeSearch = rangeSearch;
  if (startDate) params.startDate = startDate;
  if (endDate) params.endDate = endDate;
  if (yearMonth) params.yearMonth = yearMonth;

  return instance({
    url: API_CALENDER.CALENDAR_DETAIL(calendarId),
    method: 'GET',
    params,
  });
};
