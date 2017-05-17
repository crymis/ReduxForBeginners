// increment
export function increment(index) {
    return {
        type: 'INCREMENT_LIKES',
        index
    };
}

// add comment
export function addComment(postId, author, comment) {
    return {
        type: 'ADD_COMMENT',
        postId,
        author,
        comment
    };
}

// remove comment
export function removeComment(postId, index) {
    return {
        type: 'REMOVE_COMMENT',
        postId,
        index
    };
}



// load images
export function loadImages() {
    return {
        type: 'LOAD_IMAGES'
    };
}

// images loaded
export function imagesLoaded(images) {
    return {
        type: 'IMAGES_LOADED',
        images
    };
}