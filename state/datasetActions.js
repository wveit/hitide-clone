import * as api from '../api-requests/datasets';
import { doSetDatasets, doSelectDataset, doUnselectDataset } from './datasetSearchSlice';
import { selectSelectedDatasets } from './datasetSearchSlice';
import { doCreateGranuleFilter, doDeleteGranuleFilter } from './granuleSearchSlice';

export const doFetchDatasets = () => async (dispatch, getState) => {
    const { bbox, startDate, endDate } = getState().datasetSearch;
    const rawResponse = await api.fetchDatasets({ bbox, startDate, endDate });
    const datasets = api.extractDatasets(rawResponse);
    dispatch(doSetDatasets(datasets));
};

export const doSelectDatasetProcess = (datasetId) => async (dispatch, getState) => {
    dispatch(doSelectDataset(datasetId));
    dispatch(doCreateGranuleFilter(datasetId));
};

export const doUnselectDatasetProcess = (datasetId) => async (dispatch, getState) => {
    dispatch(doUnselectDataset(datasetId));
    dispatch(doDeleteGranuleFilter(datasetId));
};

export const doToggleDataset = (datasetId) => async (dispatch, getState) => {
    const isSelected = !!selectSelectedDatasets(getState())[datasetId];
    if (isSelected) dispatch(doUnselectDatasetProcess(datasetId));
    else dispatch(doSelectDatasetProcess(datasetId));
};
