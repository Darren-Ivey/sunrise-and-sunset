import React from 'react';
import { render } from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import logger from 'redux-logger';

// Routing
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import { rootReducer, rootSaga } from './modules/index.js';
import createSagaMiddleware from 'redux-saga';
import { Route } from 'react-router-dom';

const history = createHistory();
const middleware = routerMiddleware(history);
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    rootReducer,
    applyMiddleware(middleware, logger, sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Route component={ App } path="/" />
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
