import {
  GET_ALL_TOONS_PENDING,
  GET_ALL_TOONS_FULFILLED,
  GET_ALL_TOONS_REJECTED,
  RESET_ALL_TOONS,
} from '../config/constants';

const initialState = {
  data: [],
  error: null,
  isLoading: true,
  title: null,
};

const toons = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_TOONS_PENDING:
      return {
        ...state,
        error: null,
        isLoading: action.payload,
      };
    case GET_ALL_TOONS_FULFILLED:
      return {
        ...state,
        data: action.payload,
        isLoading: action.isLoading,
        title: action.title,
      };
    case GET_ALL_TOONS_REJECTED:
      return {
        ...state,
        error: action.payload,
        isLoading: action.isLoading,
      };
    case RESET_ALL_TOONS:
      return initialState;
    default:
      return state;
  }
};

export default toons;
