import { createAction } from 'redux-actions';
import { fetchCoordinates } from '../services/services';
import { call, put } from 'redux-saga/effects';

// actions
export const GET_COORDINATES = 'GET_COORDINATES';
export const GET_COORDINATES_SUCCESS = 'GET_COORDINATES_SUCCESS';
export const GET_COORDINATES_FAILED  = 'GET_COORDINATES_FAILED';

// initial state
const INITIAL_STATE = {
    status: 'uninitiated',
    error: undefined,
    coordinates: undefined,
    sunrise: undefined,
    sunset: undefined
};

export default(state = INITIAL_STATE, action) => {

    const { payload, type } = action;

    switch (type) {

        case GET_COORDINATES:
            return {
                ...state,
                status: 'loading'
            };

        case GET_COORDINATES_SUCCESS:
            return {
                ...state,
                status: 'received',
                coordinates: payload
            };

        case GET_COORDINATES_FAILED:
            return {
                ...state,
                status: 'failed',
                error: 'failed'
            };

        default:
            return state;
    }
};

// action creators
export const getCoordinates = createAction(GET_COORDINATES);
export const getCoordinatesSuccess = createAction(GET_COORDINATES_SUCCESS);
export const getCoordinatesFailed = createAction(GET_COORDINATES_FAILED);

// sagas
export function* getCoordinatesSaga ({ payload: { postcode }}) {

    try {
        const response = yield call(fetchCoordinates, { postcode });

        yield put(getCoordinatesSuccess(response));
    } catch (error) {
        yield put(getCoordinatesFailed(error));
    }
}

export function* watchSunActivitySaga () {
    yield takeLatest(GET_COORDINATES, getCoordinatesSaga);
}

// selectors
export const getUserSunriseAndSunset = (state) => state.tactics.profileTactics;
