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
    },
});

export default slice.reducer;
export const { doAddPendingJob } = slice.actions;

export const selectPendingJobs = (state) => state.pendingJob.pendingJobs;