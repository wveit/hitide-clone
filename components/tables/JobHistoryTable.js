import { useEffect } from 'react';
import { connect } from 'react-redux';
import { selectJobHistory } from '../../state/jobHistorySlice';
import { doUpdateJobs } from '../../state/jobHistoryActions';

export function JobHistoryTable({ jobs, updateJobs }) {
    useEffect(() => {
        const handle = setInterval(() => {
            updateJobs();
        }, 2000);

        return () => clearInterval(handle);
    });

    return (
        <div className='hitide-table'>
            <div className='hitide-table__row hitide-table__header'>
                <div></div>
                <div>Start Time</div>
                <div>Status</div>
                <span className='far fa-times-circle hitide-btn' />
            </div>
            {Object.values(jobs).map((job) => (
                <div className='hitide-table__row' key={job.token}>
                    <i className='fa fa-info-circle hitide-btn' aria-hidden='true'></i>
                    <span>{job.jobCreated}</span>
                    {job.status === 'done' ? (
                        <div>
                            <button>Done - Download Links</button>
                        </div>
                    ) : (
                        <span>{job.status}</span>
                    )}
                    <span className='far fa-times-circle hitide-btn' />
                </div>
            ))}

            <style jsx>{`
                .hitide-table {
                    height: 150px;
                }

                .hitide-table__header,
                .hitide-table__row {
                    display: grid;
                    grid-template-columns: 2rem 1fr 1.2fr auto;
                    justify-content: start;
                }

                .hitide-btn {
                    font-size: 1rem;
                }

                .fa-info-circle {
                    color: rgb(96, 152, 204);
                }
            `}</style>
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

export default connect(select, actions)(JobHistoryTable);
