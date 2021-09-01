import { useEffect, useState } from 'react';
import { Modal } from './Modal';

function format(date, defaultDate) {
    if (!date) {
        date = defaultDate;
    }
    const newDate = new Date(date);

    const yearString = newDate.getFullYear();
    const month = newDate.getMonth() + 1;
    let monthString = '' + month;
    if (month < 10) {
        monthString = '0' + month;
    }
    let dayOfMonth = newDate.getDate();
    let dayOfMonthString = '' + dayOfMonth;
    if (dayOfMonth < 10) {
        dayOfMonthString = '0' + dayOfMonth;
    }

    const dateString = `${yearString}-${monthString}-${dayOfMonthString}`;
    return dateString;
}

export function DateRangeModal({ show, startDate, endDate, onNewDateRange, onReset, onClose }) {
    const [start, setStart] = useState(format(startDate, '2000-01-01'));
    const [end, setEnd] = useState(format(endDate, new Date()));

    useEffect(() => {
        setStart(format(startDate, '2000-01-01'));
        setEnd(format(endDate, new Date()));
    }, [startDate, endDate]);

    function handleChange(event) {
        if (event.target.name === 'start') {
            setStart(event.target.value);
        } else {
            setEnd(event.target.value);
        }
    }

    function handleUpdate() {
        onNewDateRange &&
            onNewDateRange({
                startDate: new Date(start).getTime(),
                endDate: new Date(end).getTime(),
            });
    }

    return (
        <Modal show={show} onClickOutside={onClose}>
            <h3>Select Date Range</h3>
            <div>
                <input type='date' name='start' value={start} onChange={handleChange} />
                <input type='date' name='end' value={end} onChange={handleChange} />
                <button onClick={handleUpdate}>Update</button>
                <button onClick={onReset}>Reset</button>
            </div>
        </Modal>
    );
}
