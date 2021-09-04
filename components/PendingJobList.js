import { connect } from 'react-redux';
import { selectPendingJobs } from '../state/pendingJobSlice';

function PendingJobList({ pendingJobs }) {
    return (
        <div className='container'>
            {Object.values(pendingJobs).map((job) => (
                <div className='job' key={job.id}>
                    <span>&gt;</span>
                    <span>{job.datasetShortName}</span>
                    <span>{job.granules.length} granules</span>
                </div>
            ))}

            <style jsx>{`
                .container {
                    width: 100%;
                    height: 200px;
                    background-color: beige;
                    padding: 3px;
                }

                .job {
                    background-color: white;
                    margin: 3px;
                    padding: 3px;
                }

                span {
                    margin: 0 1rem;
                }
            `}</style>
        </div>
    );
}

function select(state) {
    return {
        pendingJobs: selectPendingJobs(state),
    };
}

export default connect(select)(PendingJobList);
