import { createSlice, createSelector } from "@reduxjs/toolkit";

const initialState = {
  granules: {},
  filters: {},
  selectedGranules: {},
  footprintGranules: {},
  previewGranules: {},
  currentFilter: null,
};

const slice = createSlice({
  name: "granuleSearch",
  initialState,
  reducers: {
    doCreateGranuleFilter(state, action) {
      const datasetId = action.payload;
      const filter = {
        datasetId,
        startDate: null,
        endDate: null,
      };
      state.filters[datasetId] = filter;
      state.currentFilter = datasetId;
      state.granules[datasetId] = {};
      state.selectedGranules[datasetId] = {};
      state.footprintGranules[datasetId] = {};
      state.previewGranules[datasetId] = {};
    },
    doDeleteGranuleFilter(state, action) {
      const datasetId = action.payload;
      delete state.filters[datasetId];
      delete state.granules[datasetId];
      delete state.selectedGranules[datasetId];
      delete state.footprintGranules[datasetId];
      delete state.previewGranules[datasetId];
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
      state.selectedGranules = {};
      state.footprintGranules = {};
      state.previewGranules = {};
    },
    doSetCurrentGranuleFilter(state, action) {
      state.currentFilter = action.payload;
    },
    doAddGranules(state, action) {
      const { datasetId, granules } = action.payload;
      state.granules[datasetId] = { ...state.granules[datasetId], ...granules };
    },
    doSetSelectedGranueles(state, action) {
      const { datasetId, selectedGranules } = action.payload;
      state.selectedGranules[datasetId] = selectedGranules;
    },
    doAddFootprintGranule(state, action) {
      const { datasetId, granuleId } = action.payload;
      state.footprintGranules[datasetId][granuleId] = true;
    },
    doRemoveFootprintGranule(state, action) {
      const { datasetId, granuleId } = action.payload;
      delete state.footprintGranules[datasetId][granuleId];
    },
    doAddPreviewGranule(state, action) {
      const { datasetId, granuleId } = action.payload;
      state.previewGranules[datasetId][granuleId] = true;
    },
    doRemovePreviewGranule(state, action) {
      const { datasetId, granuleId } = action.payload;
      delete state.previewGranules[datasetId][granuleId];
    },
    doSetStartDate(state, action) {
      const { datasetId, startDate } = action.payload;
      state.filters[datasetId].startDate = startDate;
    },
    doSetEndDate(state, action) {
      const { datasetId, endDate } = action.payload;
      state.filters[datasetId].endDate = endDate;
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
  doSetSelectedGranueles,
  doAddFootprintGranule,
  doRemoveFootprintGranule,
  doAddPreviewGranule,
  doRemovePreviewGranule,
  doSetStartDate,
  doSetEndDate,
} = slice.actions;

export const selectGranuleFilters = (state) => state.granuleSearch.filters;
export const selectCurrentGranuleFilter = (state) =>
  state.granuleSearch.currentFilter;
export const selectGranules = (state) => state.granuleSearch.granules;
export const selectSelectedGranules = (state) =>
  state.granuleSearch.selectedGranules;
export const selectFootprintGranuleIds = (state) =>
  state.granuleSearch.footprintGranules;
export const selectPreviewGranuleIds = (state) =>
  state.granuleSearch.previewGranules;

export const selectFootprintGranuleList = createSelector(
  selectFootprintGranuleIds,
  selectGranules,
  (footprintGranuleIds, granules) => {
    const footprintGranules = [];

    Object.keys(footprintGranuleIds).forEach((datasetId) => {
      Object.keys(footprintGranuleIds[datasetId]).forEach((granuleId) => {
        footprintGranules.push(granules[datasetId][granuleId]);
      });
    });

    return footprintGranules;
  }
);

export const selectPreviewGranuleList = createSelector(
  selectPreviewGranuleIds,
  selectGranules,
  (previewGranuleIds, granules) => {
    const previewGranules = [];

    Object.keys(previewGranuleIds).forEach((datasetId) => {
      Object.keys(previewGranuleIds[datasetId]).forEach((granuleId) => {
        previewGranules.push(granules[datasetId][granuleId]);
      });
    });

    return previewGranules;
  }
);
