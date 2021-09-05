import { useEffect } from 'react';
import { connect } from 'react-redux';
import { selectJobHistory } from '../state/jobHistorySlice';
import { doUpdateJobs } from '../state/jobHistoryActions';

export function JobHistory({ jobs, updateJobs }) {
    useEffect(() => {
        const handle = setInterval(() => {
            updateJobs();
        }, 2000);

        return () => clearInterval(handle);
    });

    return (
        <div>
            <h4>History</h4>
            {Object.values(jobs).map((job) => (
                <div key={job.token}>
                    {job.token} -- {job.status}
                </div>
            ))}
        </div>
    );
}

function select(state) {
    return {
        jobs: selectJobHistory(state),
    };
}

const actions = {
    updateJobs: doUpdateJobs,
};

export default connect(select, actions)(JobHistory);
