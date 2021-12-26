import { configureStore } from '@reduxjs/toolkit';
import datasetSearch from './datasetSearchSlice';
import granuleSearch from './granuleSearchSlice';
import pendingJob from './pendingJobSlice';
import variables from './variablesSlice';
import jobHistory from './jobHistorySlice';
import modals from './modalsSlice';

export function createStore({ datasetSearchService } = {}) {
    return configureStore({
        reducer: {
            datasetSearch,
            granuleSearch,
            pendingJob,
            variables,
            jobHistory,
            modals,
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                thunk: {
                    extraArgument: { datasetSearchService },
                },
            }),
    });
}

const store = configureStore({
    reducer: {
        datasetSearch,
        granuleSearch,
        pendingJob,
        variables,
        jobHistory,
        modals,
    },
});

export default store;
