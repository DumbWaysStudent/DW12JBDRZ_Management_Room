import {
  fetchData,
  fetchDataFulfilled,
  fetchDataRejected,
} from '../_actions/toons';
import {API} from '../config/api';

const toons = (user_id, isSearch, title) => {
  return dispatch => {
    if (isSearch) {
      dispatch(fetchData(false));
      API.get(`/user/${user_id}/all_webtoons?title=${title}`)
        .then(res => {
          dispatch(fetchDataFulfilled(res.data, title));
        })
        .catch(error => {
          dispatch(fetchDataRejected(error));
        });
    } else {
      dispatch(fetchData(true));
      API.get(`/user/${user_id}/all_webtoons`)
        .then(res => {
          dispatch(fetchDataFulfilled(res.data, title));
        })
        .catch(error => {
          if (error.response) {
            const {data, status} = error.response;

            if (status > 399) {
              dispatch(fetchDataRejected(data.message));
            }
          } else {
            dispatch(fetchDataRejected(error.message));
          }
        });
    }
  };
};

export default toons;
