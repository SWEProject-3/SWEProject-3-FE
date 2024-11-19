import { API_CALENDER } from '@/constants/API';

import instance from './instance';

export const getDepartmentCalendar = (
  departmentId,
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
    url: API_CALENDER.DEPARTMENTCALENDAR(departmentId),
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
