export const API_AUTH = Object.freeze({
  REGISTER: '/auth/register',
  LOGIN: '/auth/login',
  PASSWORD: '/auth/password',
  CHECK_TOKEN: '/auth/check-token',
});

export const API_DEPARTMENT = Object.freeze({
  DEPARTMENT: '/departments',
  SUBSCRIPTIONS: (userId) => `/departments/${userId}/subscriptions`,
  SUBSCRIBE: (userId, departId) =>
    `/departments/${userId}/subscribe/${departId}`,
  SUBSCRIBED_DEPARTMENTS: (userId) =>
    `/users/${userId}/subscriptions/departments`,
});

export const API_CALENDER = Object.freeze({
  CALENDAR: '/calenders',
  CALENDAR_CHANGE: (calendarId) => `/calenders/${calendarId}`,
  CALENDAR_DETAIL: (calendarId) => `/calenders/${calendarId}/events`,
  USER_EVENTS: (userId) => `/users/${userId}/calendars/events`,
});

export const API_USER = Object.freeze({
  WITHDRAW: '/users/withdraw',
  PROFILE: (userId) => `/users/${userId}/profiles`,
  EDIT_NAME: `/users/profiles`,
});
