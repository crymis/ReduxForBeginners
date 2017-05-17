// a reducer takes 2 things: 
// 1. the action (info about what happend)
// 2. copy of current state

function postComments(state = [], action) {
    switch(action.type) {
    case 'ADD_COMMENT': 
        return [...state,
            {
                user: action.author,
                text: action.comment
            }];
    case 'REMOVE_COMMENT':
        // return state without deleted comment
        return [
            ...state.slice(0, action.index),
            ...state.slice(action.index + 1)
        ];
    default:
        return state;
    }
}

function comments(state = [], action) {
    if (typeof action.postId !== 'undefined') {
        return {
            // take the current state
            ...state,
            // overwrite this post with a new one
            [action.postId]: postComments(state[action.postId], action)
        };
    }
    return state;




    /* the way without reducer composition */

    // switch(action.type) {
    // case 'ADD_COMMENT': 
    //     console.log('add comment');
    //     console.log(state);
    //     console.log(action.postId);
    //     console.log(state[action.postId]);
    //     // make copy of state and return modified one
    //     return {
    //         ...state,
    //         [action.postId]: [...state[action.postId], {user: action.author, text: action.comment}]
    //     };
    // default:
    //     return state;
    // }
}

export default comments;