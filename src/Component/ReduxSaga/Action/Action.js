import { ADD_ITEM_FAILURE, ADD_ITEM_REQUEST, ADD_ITEM_SUCCESS, DELETE_ITEM_FAILURE, DELETE_ITEM_REQUEST, DELETE_ITEM_SUCCESS, GET_ITEMS_FAILURE, GET_ITEMS_REQUEST, GET_ITEMS_SUCCESS, UPDATE_ITEM_FAILURE, UPDATE_ITEM_REQUEST, UPDATE_ITEM_SUCCESS } from "../Type/Type";

// Add Item Actions
export const addItemRequest = (item) => ({
  type: ADD_ITEM_REQUEST,
  payload: item,
});
export const addItemSuccess = (item) => ({
  type: ADD_ITEM_SUCCESS,
  payload: item,
});
export const addItemFailure = (error) => ({
  type: ADD_ITEM_FAILURE,
  payload: error,
});

// Get Items Actions
export const getItemsRequest = () => ({
  type: GET_ITEMS_REQUEST,
});
export const getItemsSuccess = (items) => ({
  type: GET_ITEMS_SUCCESS,
  payload: items,
});
export const getItemsFailure = (error) => ({
  type: GET_ITEMS_FAILURE,
  payload: error,
});

// Update Item Actions
export const updateItemRequest = (item) => ({
  type: UPDATE_ITEM_REQUEST,
  payload: item,
});
export const updateItemSuccess = (item) => ({
  type: UPDATE_ITEM_SUCCESS,
  payload: item,
});
export const updateItemFailure = (error) => ({
  type: UPDATE_ITEM_FAILURE,
  payload: error,
});

// Delete Item Actions
export const deleteItemRequest = (id) => ({
  type: DELETE_ITEM_REQUEST,
  payload: id,
});
export const deleteItemSuccess = (id) => ({
  type: DELETE_ITEM_SUCCESS,
  payload: id,
});
export const deleteItemFailure = (error) => ({
  type: DELETE_ITEM_FAILURE,
  payload: error,
});
