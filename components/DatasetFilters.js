import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import {
    selectStartDate,
    selectEndDate,
    selectBbox,
    doSetStartDate,
    doSetEndDate,
    doSetBbox,
} from '../state/datasetSearchSlice';
import { doFetchDatasets } from '../state/datasetActions';

function formatDate(dateNumber) {
    if (!dateNumber) return 'none';
    const date = new Date(dateNumber);
    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
}

function DatasetFilters({ startDate, onSetStartDate, endDate, onSetEndDate, bbox, onSetBbox, onFetchDatasets }) {
    const [start, setStart] = useState(formatDate(startDate));
    const [end, setEnd] = useState(formatDate(endDate));
    const [box, setBox] = useState(JSON.stringify(bbox));

    useEffect(() => onFetchDatasets(), [onFetchDatasets]);

    return (
        <div className='DatasetFilters'>
            <div>
                <label>
                    Start Date
                    <input type='text' value={start} onChange={(event) => setStart(event.target.value)} />
                </label>
                <button onClick={() => onSetStartDate(start)}>Update</button>
                <button onClick={() => setStart(formatDate(startDate))}>Reset</button>
            </div>
            <div>
                <label>
                    End Date
                    <input type='text' value={end} onChange={(event) => setEnd(event.target.value)} />
                </label>
                <button onClick={() => onSetEndDate(end)}>Update</button>
                <button onClick={() => setEnd(formatDate(endDate))}>Reset</button>
            </div>
            <div>
                <label>
                    Bounding Box
                    <input type='text' value={box} onChange={(event) => setBox(event.target.value)} />
                </label>
                <button onClick={() => onSetBbox(JSON.parse(box))}>Update</button>
                <button onClick={() => setBox(JSON.stringify(bbox))}>Reset</button>
            </div>
        </div>
    );
}

const actions = {
    onSetStartDate: doSetStartDate,
    onSetEndDate: doSetEndDate,
    onSetBbox: doSetBbox,
    onFetchDatasets: doFetchDatasets,
};

function select(state) {
    return {
        startDate: selectStartDate(state),
        endDate: selectEndDate(state),
        bbox: selectBbox(state),
    };
}

export default connect(select, actions)(DatasetFilters);
