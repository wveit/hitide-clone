import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    datasets: {},
    startDate: new Date(2000, 0, 1).getTime(),
    endDate: null,
    bbox: [-180, -90, 180, 90],
};

const slice = createSlice({
    name: 'datasetSearch',
    initialState,
    reducers: {
        doSetDatasets(state, action) {
            state.datasets = action.payload;
        },
        doSetStartDate(state, action) {
            state.startDate = action.payload;
        },
        doSetEndDate(state, action) {
            state.endDate = action.payload;
        },
        doSetBbox(state, action) {
            state.bbox = action.payload;
        },
    },
});

export default slice.reducer;
export const { doSetDatasets, doSetStartDate, doSetEndDate, doSetBbox } = slice.actions;

export const selectDatasets = (state) => state.datasetSearch.datasets;
export const selectStartDate = (state) => state.datasetSearch.startDate;
export const selectEndDate = (state) => state.datasetSearch.endDate;
export const selectBbox = (state) => state.datasetSearch.bbox;
