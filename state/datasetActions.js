import {
    doSetDatasets,
    doSelectDataset,
    doUnselectDataset,
    doUnselectAllDatasets,
    selectSelectedDatasets,
} from './datasetSearchSlice';
import { doFetchGranules } from './granuleActions';
import { doSetVariables, doSetImageVariables, selectVariables } from './variablesSlice';
import { doCreateGranuleFilter, doDeleteGranuleFilter, doDeleteAllGranuleFilters } from './granuleSearchSlice';

export const doFetchDatasets =
    () =>
    async (dispatch, getState, { datasetSearchService }) => {
        const { bbox, startDate, endDate } = getState().datasetSearch;
        const datasets = await datasetSearchService.fetchDatasets({ bbox, startDate, endDate });
        dispatch(doSetDatasets(datasets));

        // TODO: Fetch Variables
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
