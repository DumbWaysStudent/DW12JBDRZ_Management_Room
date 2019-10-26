import {
  fetchData,
  fetchDataFulfilled,
  fetchDataRejected,
} from '../_actions/favorites';
import {API} from '../config/api';
import {METHOD_GET, METHOD_POST, METHOD_DELETE} from '../config/constants';

const favorites = (method, user_id, webtoon_id) => {
  switch (method) {
    case METHOD_GET:
      return dispatch => {
        dispatch(fetchData(method, null, true));
        API.get(`/user/${user_id}/webtoons/favorites`)
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
              dispatch(fetchDataRejected(method, error.message));
            }
          });
      };
    case METHOD_POST:
      return dispatch => {
        dispatch(fetchData(method, webtoon_id, true));
        API.post(`/user/${user_id}/webtoon/${webtoon_id}/favorite`)
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
              dispatch(fetchDataRejected(method, error.message));
            }
          });
      };
    case METHOD_DELETE:
      return dispatch => {
        dispatch(fetchData(method, webtoon_id, true));
        API.delete(`/user/${user_id}/webtoon/${webtoon_id}/favorite`)
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
              dispatch(fetchDataRejected(method, error.message));
            }
          });
      };
    default:
      return method;
  }
};

export default favorites;
