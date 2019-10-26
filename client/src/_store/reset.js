import {resetAllToons} from '../_actions/toons';
import {resetFavs} from '../_actions/favorites';
import {resetEps} from '../_actions/episodes';
import {resetPages} from '../_actions/pages';

const reset = () => {
  return dispatch => {
    dispatch(resetAllToons());
    dispatch(resetFavs());
    dispatch(resetEps());
    dispatch(resetPages());
  };
};

export default reset;
