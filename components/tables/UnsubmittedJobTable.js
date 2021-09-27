import { connect } from 'react-redux';
import { selectPendingJobs, doToggleJobVariable, doRemovePendingJob } from '../../state/pendingJobSlice';
import { useState } from 'react';

function Job({ job, onRemoveJob, onVariableToggle }) {
    const [showDetails, setShowDetails] = useState(false);
    const [showGranules, setShowGranules] = useState(false);
    const [showVariables, setShowVariables] = useState(false);

    return (
        <div className='unsubmitted-job' key={job.id}>
            <div className='main-row'>
                <span className={'toggle' + (showDetails ? ' down' : '')} onClick={() => setShowDetails(!showDetails)}>
                    &rsaquo;
                </span>
                <span>{job.datasetShortName}</span>
                <span className='granule-count'>{job.granules.length} granules</span>
                <span onClick={() => onRemoveJob(job.id)}>X</span>
            </div>
            <div className={'details-row' + (showDetails ? '' : ' hidden')}>
                <div>Region: {job.bbox.join(', ')}</div>
                <div>
                    Date Range: {job.startDate ? new Date(job.startDate).toLocaleDateString() : '--'} to{' '}
                    {job.endDate ? new Date(job.endDate).toLocaleDateString() : '--'}
                </div>
                <div>Granule Name Filter: {job.nameFilter || 'none'}</div>
                <div>
                    <span
                        className={'toggle' + (showGranules ? ' down' : '')}
                        onClick={() => setShowGranules(!showGranules)}
                    >
                        &rsaquo;
                    </span>
                    <span>Granules:</span>
                </div>
                <div className={showGranules ? '' : 'hidden'}>
                    {job.granules.map((granule) => (
                        <div key={granule}>
                            <span>{granule}</span>
                        </div>
                    ))}
                </div>
                <div>
                    <span
                        className={'toggle' + (showVariables ? ' down' : '')}
                        onClick={() => setShowVariables(!showVariables)}
                    >
                        &rsaquo;
                    </span>
                    <span>Variables:</span>
                </div>
                <div className={showVariables ? '' : 'hidden'}>
                    {Object.keys(job.variables).map((variable) => (
                        <div key={variable}>
                            <input
                                type='checkbox'
                                checked={job.variables[variable]}
                                onChange={() => onVariableToggle({ jobId: job.id, variable })}
                            />
                            <span>{variable}</span>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
                .unsubmitted-job {
                    display: flex;
                    flex-direction: column;
                    align-items: stretch;
                    width: 100%;
                }

                .main-row {
                    display: flex;
                    align-items: center;
                    padding: 4px;
                }

                span {
                    margin: 0 0.3rem;
                }

                .toggle {
                    color: rgb(74, 131, 131);
                    font-weight: bold;
                    cursor: pointer;
                    user-select: none;
                }

                .down {
                    transform: rotate(90deg);
                }

                .granule-count {
                    margin-left: auto;
                }

                .details-row {
                    border-top: 1px solid lightgray;
                }

                .details-row > * {
                    padding: 0.5rem 0.2rem 0;
                }

                .hidden {
                    display: none;
                }
            `}</style>
        </div>
    );
}

function UnsubmittedJobTable({ pendingJobs, onRemoveJob, onVariableToggle }) {
    return (
        <div className='hitide-table'>
            {Object.values(pendingJobs).map((job) => (
                <div key={job.id} className='hitide-table__row'>
                    <Job job={job} onVariableToggle={onVariableToggle} onRemoveJob={onRemoveJob} />
                </div>
            ))}

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

const actions = {
    onRemoveJob: doRemovePendingJob,
    onVariableToggle: doToggleJobVariable,
};

export default connect(select, actions)(UnsubmittedJobTable);
