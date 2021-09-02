import * as api from '../api-requests/datasets';
import {
    doSetDatasets,
    doSelectDataset,
    doUnselectDataset,
    doUnselectAllDatasets,
    selectSelectedDatasets,
} from './datasetSearchSlice';
import { doFetchGranules } from './granuleActions';
import { doSetVariables, doSetImageVariables, doAddPalette, selectVariables } from './variablesSlice';
import { doCreateGranuleFilter, doDeleteGranuleFilter, doDeleteAllGranuleFilters } from './granuleSearchSlice';

export const doFetchDatasets = () => async (dispatch, getState) => {
    const { bbox, startDate, endDate } = getState().datasetSearch;
    const rawResponse = await api.fetchDatasets({ bbox, startDate, endDate });
    const datasets = api.extractDatasets(rawResponse);
    dispatch(doSetDatasets(datasets));

    Object.keys(datasets).forEach((datasetId) => {
        dispatch(doFetchVariables(datasetId));
    });
};

export const doSelectDatasetProcess = (datasetId) => (dispatch) => {
    dispatch(doSelectDataset(datasetId));
    dispatch(doCreateGranuleFilter(datasetId));
    dispatch(doFetchGranules(datasetId));
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

export const doFetchVariables = (datasetId) => async (dispatch, getState) => {
    const variables = selectVariables(getState());
    if (variables[datasetId]) return;

    const response = await fetch(
        'https://podaac-tools.jpl.nasa.gov/l2ss-services/l2ss/dataset/variable?datasetId=' + datasetId
    ).then((res) => res.json());

    dispatch(doSetVariables({ datasetId, variables: response.variables }));
    dispatch(doSetImageVariables({ datasetId, variables: response.imgVariables }));
};
