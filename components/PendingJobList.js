import { connect } from 'react-redux';
import { selectPendingJobs } from '../state/pendingJobSlice';

function PendingJobList({ pendingJobs }) {
    return (
        <div className='hitide-table'>
            <div className='hitide-table__content'>
                {Object.values(pendingJobs).map((job) => (
                    <div className='hitide-table__row' key={job.id}>
                        <span>&gt;</span>
                        <span>{job.datasetShortName}</span>
                        <span>{job.granules.length} granules</span>
                    </div>
                ))}
            </div>

            <style jsx>{`
                .hitide-table__content {
                    height: 150px;
                }

                .hitide-table__row {
                    margin: 4px;
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
