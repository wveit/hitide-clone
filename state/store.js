import { configureStore } from '@reduxjs/toolkit';
import datasetSearch from './datasetSearchSlice';
import granuleSearch from './granuleSearchSlice';
import pendingJob from './pendingJobSlice';
import variables from './variablesSlice';

const store = configureStore({
    reducer: {
        datasetSearch,
        granuleSearch,
        pendingJob,
        variables,
    },
});

export default store;
