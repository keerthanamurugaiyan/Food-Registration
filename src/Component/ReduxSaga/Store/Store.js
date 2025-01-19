import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import itemReducer from '../Reducer/Reducer';
import itemSagas from '../Saga/Saga';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(itemReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(itemSagas);

export default store;
