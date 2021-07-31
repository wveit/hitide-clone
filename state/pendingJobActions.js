import { doAddPendingJob as _doAddPendingJob } from './pendingJobSlice';
import { selectCurrentGranuleFilter, selectSelectedGranules } from './granuleSearchSlice';
import { selectBbox } from './datasetSearchSlice';

export const doAddPendingJob = () => (dispatch, getState) => {
    const id = new Date().getTime();
    const state = getState();
    const datasetId = selectCurrentGranuleFilter(state);
    const granules = Object.keys(selectSelectedGranules(state)[datasetId]);
    const bbox = selectBbox(state);

    dispatch(_doAddPendingJob({ id, datasetId, granules, bbox }));
};
