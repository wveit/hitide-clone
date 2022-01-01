import { doSetDatasetGranuleCount, selectBbox } from './datasetSearchSlice';
import { doAddGranules, selectGranuleFilters } from './granuleSearchSlice';

export const doFetchGranules = (datasetId) => async (dispatch, getState, {granuleSearchService}) => {
    const state = getState();
    const bbox = selectBbox(state);
    const { startDate, endDate } = selectGranuleFilters(state)[datasetId];
    // const rawResponse = await fetchGranules({ datasetId, bbox, startDate, endDate });
    // const { granules, count } = extractGranules(rawResponse);
    const {granules, count} = await granuleSearchService.fetchGranules({datasetId, bbox, startDate, endDate});

    dispatch(doSetDatasetGranuleCount({ datasetId, count }));
    dispatch(doAddGranules({ datasetId, granules }));
};
