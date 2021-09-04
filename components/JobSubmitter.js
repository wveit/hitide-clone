import { connect } from 'react-redux';
import { useState } from 'react';
import { selectPendingJobs } from '../state/pendingJobSlice';

export function JobSubmitter({ pendingJobs }) {
    const [token, setToken] = useState(null);
    const [email, setEmail] = useState(null);

    async function handleSubmit() {
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

        const token = response.token;
        setToken(token);
    }

    return (
        <div>
            <input type='text' name='email' onChange={(event) => setEmail(event.target.value)} />
            <button onClick={handleSubmit}>Submit Jobs</button>
            <div>{token}</div>
        </div>
    );
}

function select(state) {
    return {
        pendingJobs: selectPendingJobs(state),
    };
}
export default connect(select)(JobSubmitter);
