import {
  METHOD_GET,
  METHOD_POST,
  METHOD_PUT,
  GET_CHECKIN_PENDING,
  GET_CHECKIN_FULFILLED,
  GET_CHECKIN_REJECTED,
  POST_CHECKIN_PENDING,
  POST_CHECKIN_FULFILLED,
  POST_CHECKIN_REJECTED,
  PUT_CHECKIN_PENDING,
  PUT_CHECKIN_FULFILLED,
  PUT_CHECKIN_REJECTED,
  RESET_CHECKIN,
} from '../config/constants';

export const fetchData = (method, bool) => {
  let actionType;

  switch (method) {
    case METHOD_GET:
      actionType = GET_CHECKIN_PENDING;
      break;
    case METHOD_POST:
      actionType = POST_CHECKIN_PENDING;
      break;
    case METHOD_PUT:
      actionType = PUT_CHECKIN_PENDING;
      break;
  }
  return {
    type: actionType,
    payload: bool,
    isPost:
      actionType == POST_CHECKIN_PENDING || actionType == PUT_CHECKIN_PENDING
        ? true
        : false,
  };
};

export const fetchDataFulfilled = (method, data) => {
  let actionType;

  switch (method) {
    case METHOD_GET:
      actionType = GET_CHECKIN_FULFILLED;
      break;
    case METHOD_POST:
      actionType = POST_CHECKIN_FULFILLED;
      break;
    case METHOD_PUT:
      actionType = PUT_CHECKIN_FULFILLED;
      break;
  }
  return {
    type: actionType,
    payload: data,
    isLoading: false,
    isPost: false,
  };
};

export const fetchDataRejected = (method, error) => {
  let actionType;

  switch (method) {
    case METHOD_GET:
      actionType = GET_CHECKIN_REJECTED;
      break;
    case METHOD_POST:
      actionType = POST_CHECKIN_REJECTED;
      break;
    case METHOD_PUT:
      actionType = PUT_CHECKIN_REJECTED;
      break;
  }
  return {
    type: actionType,
    payload: error,
    isLoading: false,
    isPost: false,
  };
};

export const resetCheckin = () => {
  return {
    type: RESET_CHECKIN,
  };
};
