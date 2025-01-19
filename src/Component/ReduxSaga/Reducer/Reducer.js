import {
    GET_ITEMS_REQUEST,
    GET_ITEMS_SUCCESS,
    GET_ITEMS_FAILURE,
    ADD_ITEM_REQUEST,
    ADD_ITEM_SUCCESS,
    ADD_ITEM_FAILURE,
    UPDATE_ITEM_REQUEST,
    UPDATE_ITEM_SUCCESS,
    UPDATE_ITEM_FAILURE,
    DELETE_ITEM_REQUEST,
    DELETE_ITEM_SUCCESS,
    DELETE_ITEM_FAILURE,
} from "../Type/Type";


const initialState = {
  items: [],
  loading: false,
  error: null,
};

const itemReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM_REQUEST:
    case GET_ITEMS_REQUEST:
    case UPDATE_ITEM_REQUEST:
    case DELETE_ITEM_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case ADD_ITEM_SUCCESS:
      return {
        ...state,
        items: [...state.items, action.payload],
        loading: false,
      };

    case GET_ITEMS_SUCCESS:
      return {
        ...state,
        items: action.payload,
        loading: false,
      };

    case UPDATE_ITEM_SUCCESS:
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
        loading: false,
      };

    case DELETE_ITEM_SUCCESS:
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
        loading: false,
      };

    case ADD_ITEM_FAILURE:
    case GET_ITEMS_FAILURE:
    case UPDATE_ITEM_FAILURE:
    case DELETE_ITEM_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default itemReducer;

