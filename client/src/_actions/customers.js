import {
  METHOD_GET,
  METHOD_POST,
  METHOD_PUT,
  GET_CUSTOMERS_PENDING,
  GET_CUSTOMERS_FULFILLED,
  GET_CUSTOMERS_REJECTED,
  POST_CUSTOMERS_PENDING,
  POST_CUSTOMERS_FULFILLED,
  POST_CUSTOMERS_REJECTED,
  PUT_CUSTOMERS_PENDING,
  PUT_CUSTOMERS_FULFILLED,
  PUT_CUSTOMERS_REJECTED,
  RESET_CUSTOMERS,
} from '../config/constants';

export const fetchData = (method, bool) => {
  let actionType;

  switch (method) {
    case METHOD_GET:
      actionType = GET_CUSTOMERS_PENDING;
      break;
    case METHOD_POST:
      actionType = POST_CUSTOMERS_PENDING;
      break;
    case METHOD_PUT:
      actionType = PUT_CUSTOMERS_PENDING;
      break;
  }
  return {
    type: actionType,
    payload: bool,
    isPost:
      actionType == POST_CUSTOMERS_PENDING ||
      actionType == PUT_CUSTOMERS_PENDING
        ? true
        : false,
  };
};

export const fetchDataFulfilled = (method, data) => {
  let actionType;

  switch (method) {
    case METHOD_GET:
      actionType = GET_CUSTOMERS_FULFILLED;
      break;
    case METHOD_POST:
      actionType = POST_CUSTOMERS_FULFILLED;
      break;
    case METHOD_PUT:
      actionType = PUT_CUSTOMERS_FULFILLED;
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
      actionType = GET_CUSTOMERS_REJECTED;
      break;
    case METHOD_POST:
      actionType = POST_CUSTOMERS_REJECTED;
      break;
    case METHOD_PUT:
      actionType = PUT_CUSTOMERS_REJECTED;
      break;
  }
  return {
    type: actionType,
    payload: error,
    isLoading: false,
    isPost: false,
  };
};

export const resetCustomers = () => {
  return {
    type: RESET_CUSTOMERS,
  };
};
