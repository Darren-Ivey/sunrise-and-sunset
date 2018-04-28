import sunActivity, { watchSunActivitySaga } from './sunActivity';
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { all, fork } from 'redux-saga/effects';

export const rootReducer = combineReducers({
    sunActivity,
    router: routerReducer
});

export function* rootSaga () {
    yield all([
        fork(watchSunActivitySaga)
    ])
}