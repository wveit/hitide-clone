import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    datasetInfoPage: null,
};

const slice = createSlice({
    name: 'modals',
    initialState,
    reducers: {
        doSetDatasetInfoPage(state, action) {
            const datasetId = action.payload;
            state.datasetInfoPage = datasetId;
        },
    },
});

export default slice.reducer;
export const { doSetDatasetInfoPage } = slice.actions;

export const selectDatasetInfoPage = (state) => state.modals.datasetInfoPage;
