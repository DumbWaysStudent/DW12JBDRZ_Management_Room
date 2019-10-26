import {
  GET_EPS_PENDING,
  GET_EPS_FULFILLED,
  GET_EPS_REJECTED,
  RESET_EPS,
} from '../config/constants';

export const fetchData = bool => {
  return {
    type: GET_EPS_PENDING,
    payload: bool,
  };
};

export const fetchDataFulfilled = (data, toon_id) => {
  return {
    type: GET_EPS_FULFILLED,
    payload: data,
    toon_id,
    isLoading: false,
  };
};

export const fetchDataRejected = error => {
  return {
    type: GET_EPS_REJECTED,
    payload: error,
    isLoading: false,
  };
};

export const resetEps = () => {
  return {
    type: RESET_EPS,
  };
};
