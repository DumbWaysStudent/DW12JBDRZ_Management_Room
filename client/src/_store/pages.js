import {
  fetchData,
  fetchDataFulfilled,
  fetchDataRejected,
} from '../_actions/pages';
import {API} from '../config/api';

const pages = (webtoon_id, episode_id) => {
  return dispatch => {
    dispatch(fetchData(true));
    API.get(`/webtoon/${webtoon_id}/episode/${episode_id}`)
      .then(res => {
        dispatch(fetchDataFulfilled(res.data));
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
  };
};

export default pages;
