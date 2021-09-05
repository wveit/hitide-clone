import { selectJobHistory, doUpdateJobHistory } from './jobHistorySlice';

export const doUpdateJobs = () => async (dispatch, getState) => {
    const jobs = selectJobHistory(getState());
    Object.values(jobs).forEach(async (job) => {
        if (job.status && job.status === 'done') return;
        const response = await fetch(
            'https://podaac-tools.jpl.nasa.gov/l2ss-services/l2ss/subset/status?token=' + job.token
        ).then((res) => res.json());

        const updatedJob = { token: job.token, ...response };
        dispatch(doUpdateJobHistory(updatedJob));
        console.log(updatedJob);
    });
};
