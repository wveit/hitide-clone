import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    jobs: {},
};

const slice = createSlice({
    name: 'jobHistory',
    initialState,
    reducers: {
        doAddJobToHistory(state, action) {
            const token = action.payload;
            state.jobs[token] = { token };
        },
        doUpdateJobHistory(state, action) {
            const job = action.payload;
            state.jobs[job.token] = job;
        },
    },
});

export default slice.reducer;
export const { doAddJobToHistory, doUpdateJobHistory } = slice.actions;

export const selectJobHistory = (state) => state.jobHistory.jobs;
