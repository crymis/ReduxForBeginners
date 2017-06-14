import React from 'react';
import { Link } from 'react-router';
import Rx from 'rxjs/Rx';

class Main extends React.Component {

    constructor(props) {
        super(props);
        props.loadImages();
    }

    componentDidMount() {
        Rx.Observable.fromEvent(this.observer, 'click')
        .throttleTime(500)
        .map((event) => {
            return event.clientX;
        })
        .scan((count, clientX) => count + clientX, 0)
        .subscribe((count) => {
            console.log(`clicked ${count} times!`);
        });

        // let myObserver = Rx.Observable.create((observer) => {
        //     observer.next(1);
        //     observer.next(2);
        //     setTimeout(() => {
        //         observer.next(4);
        //         observer.complete();
        //         observer.next(5); // never seen by subscriber
        //     }, 2000);
        //     observer.next(3);
        // });

        // console.log('before subscribe');
        // myObserver.subscribe({
        //     next: (x) => console.log('got value ', + x),
        //     error: (err) => console.error('error occured: ', err),
        //     complete: () => console.log('!finished with counting!')
        // });
        // console.log('after subscribe');
    }

    render() {
        return (
            <div>
                <h1 className="header">
                    <Link to="/">Reduxstagram</Link>
                </h1>
                <button ref={(button) => this.observer = button}>Observe</button>
                {React.cloneElement(this.props.children, this.props)}
            </div>
        );
    }

}

export default Main;