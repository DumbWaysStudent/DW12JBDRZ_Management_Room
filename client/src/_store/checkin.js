import {
  fetchData,
  fetchDataFulfilled,
  fetchDataRejected,
} from '../_actions/checkin';
import {API} from '../config/api';
import {METHOD_GET, METHOD_POST, METHOD_PUT} from '../config/constants';
import strings from '../config/strings';

const checkin = (method, user_id, orderData, order_id) => {
  switch (method) {
    case METHOD_GET:
      return dispatch => {
        dispatch(fetchData(method, true));
        API.get(`/user/${user_id}/checkin`)
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
        API.post(`/user/${user_id}/checkin`, {
          room_id: orderData.room_id,
          customer_id: orderData.customer_id,
          duration: parseInt(orderData.duration),
        })
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
        API.put(`/user/${user_id}/order/${order_id}`)
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

export default checkin;
