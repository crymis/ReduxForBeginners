import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/actionCreators';
import Main from './Main';


// map all state attributes to props, so that the other components can access them via props.x
function mapStateToProps(state) {
    return {
        posts: state.posts,
        comments: state.comments
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

const App = connect(mapStateToProps, mapDispatchToProps)(Main);

export default App;