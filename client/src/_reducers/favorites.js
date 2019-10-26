import {
  GET_FAVS_PENDING,
  GET_FAVS_FULFILLED,
  GET_FAVS_REJECTED,
  POST_FAV_PENDING,
  POST_FAV_FULFILLED,
  POST_FAV_REJECTED,
  DEL_FAV_PENDING,
  DEL_FAV_FULFILLED,
  DEL_FAV_REJECTED,
  RESET_FAVS,
} from '../config/constants';

const initialState = {
  data: [],
  error: null,
  toon_id: null,
  isLoading: true,
  isPost: false,
  isDelete: false,
};

const favorites = (state = initialState, action) => {
  switch (action.type) {
    case GET_FAVS_PENDING:
    case POST_FAV_PENDING:
    case DEL_FAV_PENDING:
      return {
        ...state,
        error: null,
        toon_id: action.toon_id,
        isLoading: action.payload,
        isPost: action.isPost,
        isDelete: action.isDelete,
      };
    case GET_FAVS_FULFILLED:
    case POST_FAV_FULFILLED:
    case DEL_FAV_FULFILLED:
      return {
        ...state,
        data: action.payload,
        isLoading: action.isLoading,
        isPost: action.isPost,
        isDelete: action.isDelete,
      };
    case GET_FAVS_REJECTED:
    case POST_FAV_REJECTED:
    case DEL_FAV_REJECTED:
      return {
        ...state,
        error: action.payload,
        isLoading: action.isLoading,
        isPost: action.isPost,
        isDelete: action.isDelete,
      };
    case RESET_FAVS:
      return initialState;
    default:
      return state;
  }
};

export default favorites;
