import {roomReset} from '../_actions/rooms';
import {customerReset} from '../_actions/customers';
import {checkinReset} from '../_actions/checkin';

const reset = () => {
  return dispatch => {
    dispatch(roomReset());
    dispatch(customerReset());
    dispatch(checkinReset());
  };
};

export default reset;
