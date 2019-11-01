import {
  checkinFetch,
  checkinFetchDone,
  checkinFetchFail,
} from '../_actions/checkin';
import axios from 'axios';
import {customerFetchDone} from '../_actions/customers';
import {roomFetchDone} from '../_actions/rooms';
import {API} from '../config/api';
import {METHOD_GET, METHOD_POST, METHOD_PUT} from '../config/constants';
import strings from '../config/strings';

const handleError = (method, dispatch, error) => {
  if (error.response) {
    const {data, status} = error.response;

    if (status > 399) {
      dispatch(checkinFetchFail(method, data.message));
    }
  } else {
    if (error.code == 'ECONNABORTED') {
      dispatch(checkinFetchFail(method, strings.TIMEOUT));
    } else {
      dispatch(checkinFetchFail(method, error.message));
    }
  }
};

const checkin = (method, user_id, orderData, order_id) => {
  switch (method) {
    case METHOD_GET:
      return dispatch => {
        dispatch(checkinFetch(method, true));
        API.get(`/user/${user_id}/checkin`)
          .then(res => {
            dispatch(checkinFetchDone(method, res.data));
            axios
              .all([
                API.get(`/user/${user_id}/customers`),
                API.get(`/user/${user_id}/rooms`),
              ])
              .then(res => {
                dispatch(customerFetchDone(method, res[0].data));
                dispatch(roomFetchDone(method, res[1].data));
              });
          })
          .catch(error => {
            handleError(method, dispatch, error);
          });
      };
    case METHOD_POST:
      return dispatch => {
        dispatch(checkinFetch(method, true));
        API.post(`/user/${user_id}/checkin`, {
          room_id: orderData.room_id,
          customer_id: orderData.customer_id,
          duration: parseInt(orderData.duration),
        })
          .then(res => {
            dispatch(checkinFetchDone(method, res.data));
          })
          .catch(error => {
            handleError(method, dispatch, error);
          });
      };
    case METHOD_PUT:
      return dispatch => {
        dispatch(checkinFetch(method, true));
        API.put(`/user/${user_id}/order/${order_id}`)
          .then(res => {
            dispatch(checkinFetchDone(method, res.data));
          })
          .catch(error => {
            handleError(method, dispatch, error);
          });
      };
    default:
      return method;
  }
};

export default checkin;
