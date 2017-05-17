import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

// get separate created reducers
import posts from './posts';
import comments from './comments';

// merge separate reducers into one global one
const rootReducer = combineReducers({posts, comments, routing: routerReducer});

export default rootReducer;