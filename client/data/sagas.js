import { all, call, put, takeLatest } from 'redux-saga/effects';
import { imagesLoaded } from '../actions/actionCreators';
import fetchJsonp from 'fetch-jsonp';
import Rx from 'rxjs/Rx';

// get own instagram data
const access_token = '1958976255.1677ed0.cef79ace32cb46be80803a1f813095d5';
const url = `https://api.instagram.com/v1/users/self/media/recent/?access_token=${access_token}`;


export function fetchInstagramImagesApi() {

    // do it the rxjs way - pretty senseless here 😜
    let obs = Rx.Observable
        .fromPromise(
            fetchJsonp(url, 
                {
                    method: 'GET',
                    mode: 'no-cors',
                    credentials: 'include'
                }
            )
        )
        .flatMap((res) => res.json())
        .map((json) => json.data)
        // .delay(2000)
        // reconvert it to a promise 
        .toPromise();
    return obs;

    // return fetchJsonp(url, 
    //     {
    //         method: 'GET',
    //         mode: 'no-cors',
    //         credentials: 'include'
    //     }
    // ).then((res) => {
    //     return res.json();
    // }).then((json) => {
    //     return json;
    // }).catch((error) => {
    //     return {error};
    // });
}

export function *fetchInstagramImages() {
    const obs = yield call(fetchInstagramImagesApi);
    // after the data has returned, it can be displayed
    yield put(imagesLoaded(obs));


    // .then((data) => {
    //     // data arrived!    
    //     console.log(d);
    //     yield put(imagesLoaded(d));
    // }, (e) => {
    //     console.log(e);
    //     d.reject(e);
    //     // yield put({type: 'IMAGES_REQUEST_FAILED', error});
    // });
}

export function *watchImagesLoaded() {
    yield takeLatest('LOAD_IMAGES', fetchInstagramImages);
}



// merge all sagas into one root saga
export default function *rootSaga() {
    yield watchImagesLoaded();
}