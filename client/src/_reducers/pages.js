import {
  GET_PAGES_PENDING,
  GET_PAGES_FULFILLED,
  GET_PAGES_REJECTED,
  RESET_PAGES,
} from '../config/constants';

const initialState = {
  data: [],
  error: null,
  isLoading: true,
};

const pages = (state = initialState, action) => {
  switch (action.type) {
    case GET_PAGES_PENDING:
      return {
        ...state,
        error: null,
        isLoading: action.payload,
      };
    case GET_PAGES_FULFILLED:
      return {
        ...state,
        data: action.payload,
        isLoading: action.isLoading,
      };
    case GET_PAGES_REJECTED:
      return {
        ...state,
        error: action.payload,
        isLoading: action.isLoading,
      };
    case RESET_PAGES:
      return initialState;
    default:
      return state;
  }
};

export default pages;
