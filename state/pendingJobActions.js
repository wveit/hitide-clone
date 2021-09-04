import { doAddPendingJob as _doAddPendingJob } from './pendingJobSlice';
import { selectDatasets } from './datasetSearchSlice';
import { selectVariables } from './variablesSlice';
import {
    selectCurrentGranuleFilter,
    selectSelectedGranules,
    selectGranuleFilters,
    selectGranules,
} from './granuleSearchSlice';
import { selectBbox } from './datasetSearchSlice';

export const doAddPendingJob = () => (dispatch, getState) => {
    const id = new Date().getTime();
    const state = getState();

    const datasetId = selectCurrentGranuleFilter(state);
    const datasetShortName = selectDatasets(state)[datasetId].shortName;

    const granuleFilter = selectGranuleFilters(state)[datasetId];
    const bbox = selectBbox(state);
    const startDate = granuleFilter.startDate;
    const endDate = granuleFilter.endDate;
    const nameFilter = granuleFilter.name;

    const allGranules = selectGranules(state)[datasetId];
    const granuleIds = Object.keys(selectSelectedGranules(state)[datasetId]);
    const granules = granuleIds.map((id) => allGranules[id].name);

    const variables = {};
    Object.values(selectVariables(state)[datasetId]).forEach((varName) => {
        variables[varName] = true;
    });

    dispatch(
        _doAddPendingJob({ id, datasetId, datasetShortName, granules, bbox, startDate, endDate, nameFilter, variables })
    );
};
