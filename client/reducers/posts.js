// a reducer takes 2 things: 
// 1. the action (info about what happend)
// 2. copy of current state

function posts(state = [], action) {

    switch(action.type) {
    case 'INCREMENT_LIKES': 
        console.log('inc likes!');
        const i = action.index;
        return [
            ...state.slice(0, i), // before the one that is updated
            {...state[i], likes: state[i].likes + 1},
            ...state.slice(i + 1) // after the one that is updated
        ];
    case 'IMAGES_LOADED':
        console.log('images loaded: ', action.images.length);
        // remap format to the one of wes bos
        return action.images.map((img) => {
            return {
                'likes': img.likes.count,
                'code': img.id,
                'caption': img.caption.text.slice(0, 150)+'...',
                'display_src': img.images.standard_resolution.url
            };
        });
    default:
        return state;
    }
}

export default posts;