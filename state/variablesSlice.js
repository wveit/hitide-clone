import { createSlice, createSelector } from '@reduxjs/toolkit';

const initialState = {
    variables: {},
    imageVariables: {},
    palettes: {},
};

const slice = createSlice({
    name: 'variables',
    initialState,
    reducers: {
        doSetVariables(state, action) {
            const { datasetId, variables } = action.payload;
            state.variables[datasetId] = variables;
        },
        doSetImageVariables(state, action) {
            const { datasetId, variables } = action.payload;
            state.imageVariables[datasetId] = variables;
        },
        doAddPalette(state, action) {
            const { key, palette } = action.payload;
            state.palettes[key] = palette;
        },
    },
});

export default slice.reducer;
export const { doSetVariables, doSetImageVariables, doAddPalette } = slice.actions;

export const selectVariables = (state) => state.variables.variables;
export const selectImageVariables = (state) => state.variables.imageVariables;
export const selectPalettes = (state) => state.variables.palettes;
