import { doAddPendingJob as _doAddPendingJob, doRemoveAllPendingJobs, selectPendingJobs } from './pendingJobSlice';
import { selectDatasets } from './datasetSearchSlice';
import { selectVariables } from './variablesSlice';
import {
    selectCurrentGranuleFilter,
    selectSelectedGranules,
    selectGranuleFilters,
    selectGranules,
} from './granuleSearchSlice';
import { selectBbox } from './datasetSearchSlice';
import { doAddJobToHistory } from './jobHistorySlice';

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

export const doSubmitPendingJobs = (email) => async (dispatch, getState) => {
    const pendingJobs = selectPendingJobs(getState());

    const jobList = Object.values(pendingJobs).map((job) => ({
        compact: false,
        datasetId: job.datasetId,
        bbox: job.bbox.join(','),
        variables: Object.keys(job.variables),
        granuleIds: job.granules,
    }));

    const query = {
        email,
        query: jobList,
    };

    const response = await fetch('https://podaac-tools.jpl.nasa.gov/l2ss-services/l2ss/subset/submit', {
        method: 'POST',
        body: 'query=' + JSON.stringify(query),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    }).then((res) => res.json());

    dispatch(doRemoveAllPendingJobs());
    dispatch(doAddJobToHistory(response.token));

    console.log('https://podaac-tools.jpl.nasa.gov/l2ss-services/l2ss/subset/status?token=' + response.token);
};
