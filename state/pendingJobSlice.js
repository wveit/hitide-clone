import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    pendingJobs: {},
};

const slice = createSlice({
    name: 'pendingJob',
    initialState,
    reducers: {
        doAddPendingJob(state, action) {
            const job = action.payload;
            state.pendingJobs[job.id] = job;
        },
        doRemoveAllPendingJobs(state, action) {
            state.pendingJobs = {};
        },
        doRemovePendingJob(state, action) {
            const jobId = action.payload;
            delete state.pendingJobs[jobId];
        },
        doToggleJobVariable(state, action) {
            const { jobId, variable } = action.payload;
            state.pendingJobs[jobId].variables[variable] = !state.pendingJobs[jobId].variables[variable];
        },
    },
});

export default slice.reducer;
export const { doAddPendingJob, doRemovePendingJob, doRemoveAllPendingJobs, doToggleJobVariable } = slice.actions;

export const selectPendingJobs = (state) => state.pendingJob.pendingJobs;
