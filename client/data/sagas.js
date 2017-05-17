import { all, call, put, takeLatest } from 'redux-saga/effects';
import { imagesLoaded } from '../actions/actionCreators';
import fetchJsonp from 'fetch-jsonp';

// get own instagram data
const access_token = 'YOURACCESSTOKENFROMHERE: http://instagram.pixelunion.net/';
const url = `https://api.instagram.com/v1/users/self/media/recent/?access_token=${access_token}`;


export function fetchInstagramImagesApi() {
    return fetchJsonp(url, 
        {
            method: 'GET',
            mode: 'no-cors',
            credentials: 'include'
        }
    ).then((res) => {
        return res.json();
    }).then((json) => {
        return json;
    }).catch((error) => {
        return {error};
    });
}

export function *fetchInstagramImages() {
    const { data, error } = yield call(fetchInstagramImagesApi);
    if (data) {
        // yield put({type: 'IMAGES_LOADED', images: response});
        yield put(imagesLoaded(data));
    } else {
        console.log(error);
        yield put({type: 'IMAGES_REQUEST_FAILED', error});
    }
}

export function *watchImagesLoaded() {
    yield takeLatest('LOAD_IMAGES', fetchInstagramImages);
}



// merge all sagas into one root saga
export default function *rootSaga() {
    yield all([
        fetchInstagramImages(),
        watchImagesLoaded()
    ]);
}