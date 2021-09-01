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
import { BoundingBoxModal } from './BoundingBoxModal';
import { DateRangeModal } from './DateRangeModal';

function DatasetFilters({ startDate, onSetStartDate, endDate, onSetEndDate, bbox, onSetBbox, onFetchDatasets }) {
    const [showBboxModal, setShowBboxModal] = useState(false);
    const [showDateRangeModal, setShowDateRangeModal] = useState(false);

    useEffect(() => onFetchDatasets(), [onFetchDatasets, startDate, endDate, bbox]);

    return (
        <div className='DatasetFilters'>
            <button onClick={() => setShowDateRangeModal(true)}>Select Date Range</button>
            <button onClick={() => setShowBboxModal(true)}>Select Region</button>
            <BoundingBoxModal
                show={showBboxModal}
                bbox={bbox}
                onClose={() => setShowBboxModal(false)}
                onNewBbox={onSetBbox}
                onReset={() => onSetBbox([-180, -90, 180, 90])}
            />
            <DateRangeModal
                show={showDateRangeModal}
                startDate={startDate}
                endDate={endDate}
                onClose={() => setShowDateRangeModal(false)}
                onNewDateRange={(dates) => {
                    onSetStartDate(dates.startDate);
                    onSetEndDate(dates.endDate);
                }}
                onReset={() => {
                    onSetStartDate(new Date(2000, 0, 1).getTime());
                    onSetEndDate(new Date().getTime());
                }}
            />
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
