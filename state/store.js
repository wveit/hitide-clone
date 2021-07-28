import { configureStore } from '@reduxjs/toolkit';
import datasetSearch from './datasetSearchSlice';
import granuleSearch from './granuleSearchSlice';
import pendingJob from './pendingJobSlice';

const store = configureStore({
    reducer: {
        datasetSearch,
        granuleSearch,
        pendingJob,
    },
});

export default store;
