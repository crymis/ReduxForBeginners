import { createStore, compose, applyMiddleware } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';
import createSagaMiddleware from 'redux-saga';

// import root reducer
import rootReducer from './reducers/index';

// get data
import comments from './data/comments';
// import posts from './data/posts';
// inject own instagram images
var posts = [{}];
import rootSaga from './data/sagas';


// create object for default state
const defaultState = {
    posts,
    comments
};

/* add saga middleware for async functions (get insta images) */
const sagaMiddleware = createSagaMiddleware();

/* Add Redux dev tools */
const enhancers = compose(
    applyMiddleware(sagaMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
);

const store = createStore(rootReducer, defaultState, enhancers);
sagaMiddleware.run(rootSaga);

export const history = syncHistoryWithStore(browserHistory, store);

/* HOT RELOAD FOR REDUCERS */
if (module.hot) {
    module.hot.accept('./reducers/', () => {
        const nextRootReducer = require('./reducers/index').default;
        store.replaceReducer(nextRootReducer);
    });
}

export default store;