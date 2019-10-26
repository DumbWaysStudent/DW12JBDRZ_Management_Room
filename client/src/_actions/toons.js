import {
  GET_ALL_TOONS_PENDING,
  GET_ALL_TOONS_FULFILLED,
  GET_ALL_TOONS_REJECTED,
  RESET_ALL_TOONS,
} from '../config/constants';

export const fetchData = bool => {
  return {
    type: GET_ALL_TOONS_PENDING,
    payload: bool,
  };
};

export const fetchDataFulfilled = (data, title) => {
  return {
    type: GET_ALL_TOONS_FULFILLED,
    payload: data,
    isLoading: false,
    title,
  };
};

export const fetchDataRejected = error => {
  return {
    type: GET_ALL_TOONS_REJECTED,
    payload: error,
    isLoading: false,
  };
};

export const resetAllToons = () => {
  return {
    type: RESET_ALL_TOONS,
  };
};
