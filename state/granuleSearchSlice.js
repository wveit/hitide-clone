import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    filters: {},
};

const slice = createSlice({
    name: 'granuleSearch',
    initialState,
    reducers: {
        doCreateGranuleFilter(state, action) {
            const datasetId = action.payload;
            const filter = {
                datasetId,
                startDate: null,
                endDate: null,
                string: null,
            };
            state.filters[datasetId] = filter;
        },
        doDeleteGranuleFilter(state, action) {
            const datasetId = action.payload;
            delete state.filters[datasetId];
        },
        doDeleteAllGranuleFilters(state, action) {
            state.filters = {};
        },
    },
});

export default slice.reducer;
export const { doCreateGranuleFilter, doDeleteGranuleFilter, doDeleteAllGranuleFilters } = slice.actions;

export const selectGranuleFilters = (state) => state.granuleSearch.filters;
