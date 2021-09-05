import { connect } from 'react-redux';
import { useState } from 'react';
import { selectPendingJobs } from '../state/pendingJobSlice';
import { doSubmitPendingJobs } from '../state/pendingJobActions';

export function JobSubmitter({ pendingJobs, submitPendingJobs }) {
    const [email, setEmail] = useState(null);

    async function handleSubmit() {
        submitPendingJobs(email);
    }

    return (
        <div>
            <input type='text' name='email' onChange={(event) => setEmail(event.target.value)} />
            <button onClick={handleSubmit}>Submit Jobs</button>
        </div>
    );
}

function select(state) {
    return {
        pendingJobs: selectPendingJobs(state),
    };
}

const actions = {
    submitPendingJobs: doSubmitPendingJobs,
};

export default connect(select, actions)(JobSubmitter);
