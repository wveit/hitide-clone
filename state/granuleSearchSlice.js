import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    filters: {},
    currentFilter: null,
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
            state.currentFilter = datasetId;
        },
        doDeleteGranuleFilter(state, action) {
            const datasetId = action.payload;
            delete state.filters[datasetId];
            const filterArray = Object.keys(state.filters);
            if (filterArray.length == 0) {
                state.currentFilter = null;
            } else if (state.currentFilter === datasetId) {
                state.currentFilter = filterArray[0];
            }
        },
        doDeleteAllGranuleFilters(state) {
            state.filters = {};
            state.currentFilter = null;
        },
        doSetCurrentGranuleFilter(state, action) {
            state.currentFilter = action.payload;
        },
    },
});

export default slice.reducer;
export const { doCreateGranuleFilter, doDeleteGranuleFilter, doDeleteAllGranuleFilters, doSetCurrentGranuleFilter } =
    slice.actions;

export const selectGranuleFilters = (state) => state.granuleSearch.filters;
export const selectCurrentGranuleFilter = (state) => state.granuleSearch.currentFilter;
