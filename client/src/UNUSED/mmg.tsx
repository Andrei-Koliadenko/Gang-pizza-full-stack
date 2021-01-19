import React, {useState} from 'react';
import DateFnsUtils from '@date-io/date-fns'; // choose your lib import
import {DatePicker, TimePicker, DateTimePicker, MuiPickersUtilsProvider,} from '@material-ui/pickers';

// function Appa() {
//     const [selectedDate, handleDateChange]: [any, any] = useState(new Date());
//
//     return (<MuiPickersUtilsProvider utils={DateFnsUtils}>
//         <DatePicker value={selectedDate} onChange={handleDateChange}/>
//         <TimePicker value={selectedDate} onChange={handleDateChange}/>
//         <DateTimePicker value={selectedDate} onChange={handleDateChange}/>
//     </MuiPickersUtilsProvider>);
// }
//
// export default Appa

// const Appa:React.FC=() => {
//     const [date, setDate] = React.useState<Date | null>(new Date());
//
//     return (
//         <DatePicker
//             value={date}
//             onChange={newDate => setDate(newDate)}
//         />
//     )
// }
//
// export default Appa

// import React, { useState } from 'react';
// import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from '@date-io/moment';

type Props = {
    orderTime: Date | null,
    setOrderTime: any,
}

function BasicTimePicker(props: Props) {
    function handleDateChange(time: Date | null) {
        props.setOrderTime(time)
    }

    return (
        <>
            <TimePicker
                value={props.orderTime}
                onChange={handleDateChange}
            />
        </>
    );
}

function TimeSelector(props: Props) {
    return (
        <div className="TimePicker">
            <MuiPickersUtilsProvider utils={MomentUtils}>
                <BasicTimePicker orderTime={props.orderTime} setOrderTime={props.setOrderTime}/>
            </MuiPickersUtilsProvider>
        </div>
    );
}

export default TimeSelector;
