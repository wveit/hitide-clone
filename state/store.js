import { configureStore } from '@reduxjs/toolkit';
import datasetSearch from './datasetSearchSlice';

const store = configureStore({
    reducer: {
        datasetSearch,
    },
});

export default store;
