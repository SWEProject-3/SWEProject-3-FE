export const API_AUTH = Object.freeze({
  REGISTER: '/auth/register',
  LOGIN: '/auth/login',
  PASSWORD: '/auth/password',
});

export const API_DEPARTMENT = Object.freeze({
  DEPARTMENT: '/departments',
  SUBSCRIPTIONS: (userId) => `/departments/${userId}/subscriptions`,
  SUBSCRIBE: (userId, departId) =>
    `/departments/${userId}/subscribe/${departId}`,
});

export const API_CALENDER = Object.freeze({
  CALENDAR: '/calenders',
  CALENDAR_CHANGE: (calendarId) => `/calenders/${calendarId}`,
  CALENDAR_DETAIL: (calendarId) => `/calenders/${calendarId}/events`,
});
