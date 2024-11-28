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

export const getEventDetail = (eventId) => {
  return instance({
    url: API_CALENDER.EVENT(eventId),
    method: 'GET',
  });
};

export const getUserCalendar = (
  userId,
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
    url: API_CALENDER.USERCALENDAR(userId),
    method: 'GET',
    params,
  });
};

export const postUserCalendar = (data) => {
  const { title, content, colorCode, startDateTime, endDateTime, imageFile } =
    data;
  const formData = new FormData();
  formData.append('title', title);
  formData.append('content', content);
  formData.append('colorCode', colorCode);
  formData.append('startDateTime', startDateTime);
  formData.append('endDateTime', endDateTime);
  if (imageFile) {
    formData.append('imageFile', imageFile);
  }

  return instance({
    url: API_CALENDER.USERPOST,
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: formData,
  });
};

//사용자 일정 조회
export const getUserEvents = (
  userId,
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
    url: API_CALENDER.USER_EVENTS(userId),
    method: 'GET',
    params,
  });
};
