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
});

export const API_CALENDER = Object.freeze({
  DEPARTMENTCALENDAR: (departmentId) =>
    `departments/${departmentId}/calendars/events`,
  USERCALENDAR: (userId) => `users/${userId}/calendars/events`,
});
