import { put, takeEvery, call } from 'redux-saga/effects';

import { 
    addItemSuccess,
    addItemFailure,
    getItemsSuccess,
    getItemsFailure,
    updateItemSuccess,
    updateItemFailure,
    deleteItemSuccess,
    deleteItemFailure,

} from '../Action/Action';
import { ADD_ITEM_REQUEST, DELETE_ITEM_REQUEST, GET_ITEMS_REQUEST, UPDATE_ITEM_REQUEST } from '../Type/Type';

// Simulated LocalStorage calls
const saveToLocalStorage = (items) => localStorage.setItem('items', JSON.stringify(items));
const loadFromLocalStorage = () => JSON.parse(localStorage.getItem('items')) || [];

// Add Item Saga
function* addItemSaga(action) {
  try {
    const existingItems = loadFromLocalStorage();
    const updatedItems = [...existingItems, action.payload];
    saveToLocalStorage(updatedItems);
    yield put(addItemSuccess(action.payload));
  } catch (error) {
    yield put(addItemFailure(error.message));
  }
}

// Get Items Saga
function* getItemsSaga() {
  try {
    const items = loadFromLocalStorage();
    yield put(getItemsSuccess(items));
  } catch (error) {
    yield put(getItemsFailure(error.message));
  }
}

// Update Item Saga
function* updateItemSaga(action) {
  try {
    const existingItems = loadFromLocalStorage();
    const updatedItems = existingItems.map((item) =>
      item.id === action.payload.id ? action.payload : item
    );
    saveToLocalStorage(updatedItems);
    yield put(updateItemSuccess(action.payload));
  } catch (error) {
    yield put(updateItemFailure(error.message));
  }
}

// Delete Item Saga
function* deleteItemSaga(action) {
  try {
    const existingItems = loadFromLocalStorage();
    const updatedItems = existingItems.filter((item) => item.id !== action.payload);
    saveToLocalStorage(updatedItems);
    yield put(deleteItemSuccess(action.payload));
  } catch (error) {
    yield put(deleteItemFailure(error.message));
  }
}

// Watcher Saga
export default function* itemSagas() {
  yield takeEvery(ADD_ITEM_REQUEST, addItemSaga);
  yield takeEvery(GET_ITEMS_REQUEST, getItemsSaga);
  yield takeEvery(UPDATE_ITEM_REQUEST, updateItemSaga);
  yield takeEvery(DELETE_ITEM_REQUEST, deleteItemSaga);
}
