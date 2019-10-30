import {resetRooms} from '../_actions/rooms';
import {resetCustomers} from '../_actions/customers';
import {resetCheckin} from '../_actions/checkin';

const reset = () => {
  return dispatch => {
    dispatch(resetRooms());
    dispatch(resetCustomers());
    dispatch(resetCheckin());
  };
};

export default reset;
