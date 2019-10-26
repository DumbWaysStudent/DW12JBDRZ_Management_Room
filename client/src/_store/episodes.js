import {
  fetchData,
  fetchDataFulfilled,
  fetchDataRejected,
} from '../_actions/episodes';
import {API} from '../config/api';

const episodes = webtoon_id => {
  return dispatch => {
    dispatch(fetchData(true));
    API.get(`/webtoon/${webtoon_id}/episodes`)
      .then(res => {
        dispatch(fetchDataFulfilled(res.data, webtoon_id));
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

export default episodes;
