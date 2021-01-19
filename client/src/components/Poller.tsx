import {useEffect} from "react";
import {Observable, Subscription} from "rxjs";
import {useDispatch} from 'react-redux'
import ErrorTypes from "../util/ErrorTypes";

export default function usePollerRedux<T>(service: any, dataFn: () => Observable<T>,
                                          action: (data: T) => { type: string, payload: any },
                                          errorHandler: (error: ErrorTypes) => void,
                                          pollingInterval?: number) {
    const dispatch = useDispatch()
    useEffect(() => {
        let intervalId: any;
        let subscription: Subscription;

        function poller() {
            if (!subscription || subscription.closed) {
                getData();
            }
        }

        intervalId = setInterval(poller, pollingInterval || 1000)

        function getData() {
            subscription = dataFn.call(service)
                .subscribe(data => dispatch(action(data)), (error) => errorHandler(error));
        }

        getData();

        return () => {
            if (subscription && !subscription.closed) {
                subscription.unsubscribe();
            }
            if (intervalId) {
                clearInterval(intervalId)
            }
        }
    }, [dataFn, pollingInterval, service, dispatch, action, errorHandler])
}