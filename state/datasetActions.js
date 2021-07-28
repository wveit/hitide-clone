import * as api from '../api-requests/datasets';
import {
    doSetDatasets,
    doSelectDataset,
    doUnselectDataset,
    doUnselectAllDatasets,
    selectSelectedDatasets,
} from './datasetSearchSlice';
import { doCreateGranuleFilter, doDeleteGranuleFilter, doDeleteAllGranuleFilters } from './granuleSearchSlice';

export const doFetchDatasets = () => async (dispatch, getState) => {
    const { bbox, startDate, endDate } = getState().datasetSearch;
    const rawResponse = await api.fetchDatasets({ bbox, startDate, endDate });
    const datasets = api.extractDatasets(rawResponse);
    dispatch(doSetDatasets(datasets));
};

export const doSelectDatasetProcess = (datasetId) => (dispatch) => {
    dispatch(doSelectDataset(datasetId));
    dispatch(doCreateGranuleFilter(datasetId));
};

export const doUnselectDatasetProcess = (datasetId) => (dispatch) => {
    dispatch(doUnselectDataset(datasetId));
    dispatch(doDeleteGranuleFilter(datasetId));
};

export const doToggleDataset = (datasetId) => (dispatch, getState) => {
    const isSelected = !!selectSelectedDatasets(getState())[datasetId];
    if (isSelected) dispatch(doUnselectDatasetProcess(datasetId));
    else dispatch(doSelectDatasetProcess(datasetId));
};

export const doUnselectAllDatasetsProcess = () => (dispatch) => {
    dispatch(doDeleteAllGranuleFilters());
    dispatch(doUnselectAllDatasets());
};
