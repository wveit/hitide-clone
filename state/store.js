import { configureStore } from '@reduxjs/toolkit';
import datasetSearch from './datasetSearchSlice';
import granuleSearch from './granuleSearchSlice';

const store = configureStore({
    reducer: {
        datasetSearch,
        granuleSearch,
    },
});

export default store;
