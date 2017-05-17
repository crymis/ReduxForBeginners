import React from 'react';
import { render } from 'react-dom';

// import css
import css from './styles/style.styl';


// import Components
import App from './components/App';
import Single from './components/Single';
import PhotoGrid from './components/PhotoGrid';

// import react router deps
import { Router, Route, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
import store, { history } from './store';




/* ______ USE SENTRY FOR ERROR TRACKING _______ */
import Raven from 'raven-js';
import { sentry_url, logException } from './data/config';

Raven.config(sentry_url, {
    tags: {
        git_commit: 'asdasd',
        userLevel: 'editor'
    }
}).install();

// logException(new Error('download failed'), {
//     email: 'wesbos@fail.de'
// });

// console.log(store.doesNot.nope());

// Raven.captureMessage('Something bad!');
// Raven.showReportDialog();


/* ___________________ */



const router = (
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={App}>
                {/* if the path is just /, indexRoute will be used */}
                <IndexRoute component={PhotoGrid}></IndexRoute>
                <Route path="/view/:postId" component={Single}></Route>
            </Route>
        </Router>
    </Provider>
);

render(router, document.querySelector('#root'));