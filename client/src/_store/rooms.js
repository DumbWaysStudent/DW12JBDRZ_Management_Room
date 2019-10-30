import {
  fetchData,
  fetchDataFulfilled,
  fetchDataRejected,
} from '../_actions/rooms';
import {API} from '../config/api';
import {METHOD_GET, METHOD_POST, METHOD_PUT} from '../config/constants';
import strings from '../config/strings';

const rooms = (method, user_id, name, room_id) => {
  switch (method) {
    case METHOD_GET:
      return dispatch => {
        dispatch(fetchData(method, true));
        API.get(`/user/${user_id}/rooms`)
          .then(res => {
            dispatch(fetchDataFulfilled(method, res.data));
          })
          .catch(error => {
            if (error.response) {
              const {data, status} = error.response;

              if (status > 399) {
                dispatch(fetchDataRejected(method, data.message));
              }
            } else {
              if (error.code == 'ECONNABORTED') {
                dispatch(fetchDataRejected(method, strings.TIMEOUT));
              } else {
                dispatch(fetchDataRejected(method, error.message));
              }
            }
          });
      };
    case METHOD_POST:
      return dispatch => {
        dispatch(fetchData(method, true));
        API.post(`/user/${user_id}/room`, {name})
          .then(res => {
            dispatch(fetchDataFulfilled(method, res.data));
          })
          .catch(error => {
            if (error.response) {
              const {data, status} = error.response;

              if (status > 399) {
                dispatch(fetchDataRejected(method, data.message));
              }
            } else {
              if (error.code == 'ECONNABORTED') {
                dispatch(fetchDataRejected(method, strings.TIMEOUT));
              } else {
                dispatch(fetchDataRejected(method, error.message));
              }
            }
          });
      };
    case METHOD_PUT:
      return dispatch => {
        dispatch(fetchData(method, true));
        API.put(`/user/${user_id}/room/${room_id}`, {name})
          .then(res => {
            dispatch(fetchDataFulfilled(method, res.data));
          })
          .catch(error => {
            if (error.response) {
              const {data, status} = error.response;

              if (status > 399) {
                dispatch(fetchDataRejected(method, data.message));
              }
            } else {
              if (error.code == 'ECONNABORTED') {
                dispatch(fetchDataRejected(method, strings.TIMEOUT));
              } else {
                dispatch(fetchDataRejected(method, error.message));
              }
            }
          });
      };
    default:
      return method;
  }
};

export default rooms;
