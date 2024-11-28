export const API_AUTH = Object.freeze({
  REGISTER: '/auth/register',
  LOGIN: '/auth/login',
  PASSWORD: '/auth/password',
  CHECK_TOKEN: '/auth/check-token',
});

export const API_DEPARTMENT = Object.freeze({
  DEPARTMENT: '/departments',
  SUBSCRIPTIONS: (userId) => `/departments/${userId}/subscriptions`,
  SUBSCRIBE: (departmentId) =>
    `/users/subscriptions/departments/${departmentId}`,
  SUBSCRIBED_DEPARTMENTS: (userId) =>
    `/users/${userId}/subscriptions/departments`,
});

export const API_CALENDER = Object.freeze({
  DEPARTMENTCALENDAR: (departmentId) =>
    `departments/${departmentId}/calendars/events`,
  USERCALENDAR: (userId) => `/users/${userId}/calendars/events`,
  EVENT: (eventId) => `/users/calendars/events/${eventId}`,
  USERPOST: '/users/calendars/events',
  CALENDAR: '/calenders',
  CALENDAR_CHANGE: (calendarId) => `/calenders/${calendarId}`,
  CALENDAR_DETAIL: (calendarId) => `/calenders/${calendarId}/events`,
  USER_EVENTS: (userId) => `/users/${userId}/calendars/events`,
});

export const API_COMMENT = Object.freeze({
  COMMENT: (eventId) => `/users/events/${eventId}/comments`,
  COMMENT_DETAIL: (commentId) => `/users/events/comments/${commentId}`,
});

export const API_LIKE = Object.freeze({
  LIKE: (eventId) => `/users/events/${eventId}/likes`,
});

export const API_FRIEND = Object.freeze({
  FRIENDREQUEST: 'friends/requests',
  FRIEND: 'friends',
  FRIENDSENT: 'friends/requests/sent',
  FRIENDRECEIVED: 'friends/requests/received',
  FRIENDACCEPT: (friendshipId) => `friends/requests/received/${friendshipId}`,
  FRIENDDELETE: (friendshipId) => `friends/${friendshipId}`,
});

export const API_USER = Object.freeze({
  WITHDRAW: '/users/withdraw',
  PROFILE: (userId) => `/users/${userId}/profiles`,
  EDIT_NAME: `/users/profiles`,
});

export const API_FEED_SORTING = Object.freeze({
  FEED_SORTING: (sort, query, page) =>
    `/users/subscriptions/departments/events?sort=${sort}&query=${query}&page=${page}`,
});
