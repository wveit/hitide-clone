import { fetchGranules } from '../api-requests/granules';
import { selectBbox, selectDatasets } from './datasetSearchSlice';
import { selectGranuleFilters } from './granuleSearchSlice';

export const doFetchGranules = (datasetId) => async (dispatch, getState) => {
    const state = getState();
    const bbox = selectBbox(state);
    const { startDate, endDate } = selectGranuleFilters(state)[datasetId];
    const rawResponse = await fetchGranules({ datasetId, bbox, startDate, endDate });
    console.log(rawResponse);
};
