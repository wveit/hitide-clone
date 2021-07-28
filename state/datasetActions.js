import * as api from '../api-requests/datasets';
import { doSetDatasets, doSelectDataset, doUnSelectDataset } from './datasetSearchSlice';
import { selectBbox, selectStartDate, selectEndDate, selectSelectedDatasets } from './datasetSearchSlice';

export const doFetchDatasets = () => async (dispatch, getState) => {
    const { bbox, startDate, endDate } = getState().datasetSearch;
    const rawResponse = await api.fetchDatasets({ bbox, startDate, endDate });
    const datasets = api.extractDatasets(rawResponse);
    dispatch(doSetDatasets(datasets));
};

export const doSelectDatasetProcess = (datasetId) => async (dispatch, getState) => {
    dispatch(doSelectDataset(datasetId));
};

export const doUnselectDatasetProcess = (datasetId) => async (dispatch, getState) => {
    dispatch(doUnselectDataset(datasetId));
};

export const doToggleDataset = (datasetId) => async (dispatch, getState) => {
    const isSelected = !!selectSelectedDatasets(getState())[datasetId];
    if (isSelected) return doSelectDatasetProcess(datasetId);
    else return doUnselectDatasetProcess(datasetId);
};
