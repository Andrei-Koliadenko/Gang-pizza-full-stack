import React from 'react';
import {useSelector} from "react-redux";
import {ReducersType} from "../../store/store";


export default function Spinner() {

    const spinnerState: boolean = useSelector<ReducersType, boolean>(state => state.spinnerState)

    return (
        <div>
            {spinnerState && <div className={"loading"}/>}
        </div>
    );
}