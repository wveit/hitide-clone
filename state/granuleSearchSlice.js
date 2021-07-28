import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    granules: {},
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
            state.granules[datasetId] = {};
        },
        doDeleteGranuleFilter(state, action) {
            const datasetId = action.payload;
            delete state.filters[datasetId];
            delete state.granules[datasetId];
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
            state.granules = {};
        },
        doSetCurrentGranuleFilter(state, action) {
            state.currentFilter = action.payload;
        },
        doAddGranules(state, action) {
            const { datasetId, granules } = action.payload;
            state.granules[datasetId] = { ...state.granules[datasetId], ...granules };
        },
    },
});

export default slice.reducer;
export const {
    doCreateGranuleFilter,
    doDeleteGranuleFilter,
    doDeleteAllGranuleFilters,
    doSetCurrentGranuleFilter,
    doAddGranules,
} = slice.actions;

export const selectGranuleFilters = (state) => state.granuleSearch.filters;
export const selectCurrentGranuleFilter = (state) => state.granuleSearch.currentFilter;
