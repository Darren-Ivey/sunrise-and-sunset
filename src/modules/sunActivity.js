import { createAction } from 'redux-actions';
import { fetchCoordinates } from '../services/services';
import { call, put, takeLatest } from 'redux-saga/effects';
import SunCalc from 'suncalc';
import moment from 'moment';

// actions
export const SUBMIT_LOCATION_AND_DATE = 'SUBMIT_LOCATION_AND_DATE';

export const GET_COORDINATES = 'GET_COORDINATES';
export const GET_COORDINATES_SUCCESS = 'GET_COORDINATES_SUCCESS';
export const GET_COORDINATES_FAILED  = 'GET_COORDINATES_FAILED';

// initial state
const INITIAL_STATE = {
    status: 'uninitiated',
    error: undefined,
    selectedDate: undefined,
    sunrise: undefined,
    sunset: undefined
};

export default(state = INITIAL_STATE, action) => {

    const { payload, type } = action;

    switch (type) {

        case SUBMIT_LOCATION_AND_DATE:
            return {
                ...state,
                selectedDate: payload.date
            };

        case GET_COORDINATES:
            return {
                ...state,
                status: 'loading'
            };

        case GET_COORDINATES_SUCCESS:
            const { latitude, longitude } = payload.result;
            const sunActivity = SunCalc.getTimes(moment(state.selectedDate).toDate(), latitude, longitude);
            return {
                ...state,
                status: 'received',
                sunrise: sunActivity.sunrise,
                sunset: sunActivity.sunset,
                error: undefined
            };

        case GET_COORDINATES_FAILED:
            return {
                ...state,
                status: 'failed',
                error: payload.error ? payload.error : payload,
                sunrise: undefined,
                sunset: undefined
            };

        default:
            return state;
    }
};

// action creators
export const getCoordinates = createAction(GET_COORDINATES);
export const getCoordinatesSuccess = createAction(GET_COORDINATES_SUCCESS);
export const getCoordinatesFailed = createAction(GET_COORDINATES_FAILED);
export const submitLocationAndDateForm = createAction(SUBMIT_LOCATION_AND_DATE);

// sagas
export function* getCoordinatesSaga ({ payload: { postcode }}) {
    yield put(getCoordinates());
    try {
        const response = yield call(fetchCoordinates, { postcode });
        yield put(getCoordinatesSuccess(response));
    } catch (error) {
        yield put(getCoordinatesFailed(error));
    }
}

export function* watchSunActivitySaga () {
    yield takeLatest(SUBMIT_LOCATION_AND_DATE, getCoordinatesSaga);
}

// selectors
export const getSunrise = (state) => state.sunActivity.sunrise ? moment(state.sunActivity.sunrise).format("HH:mm"): undefined;
export const getSunset = (state) => state.sunActivity.sunrise ? moment(state.sunActivity.sunset).format("HH:mm"): undefined;
export const getError = (state) => state.sunActivity.error;