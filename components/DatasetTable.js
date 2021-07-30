import { connect } from 'react-redux';
import { selectDatasets, selectSelectedDatasets } from '../state/datasetSearchSlice';
import { doToggleDataset } from '../state/datasetActions';

export function DatasetTable({ datasets, selectedDatasets, onToggleDataset }) {
    const dsArray = Object.values(datasets);
    return (
        <>
            <p>Found {dsArray.length} datasets.</p>
            <div className='container'>
                <div className='row header'>
                    <div>Select</div>
                    <div>Name</div>
                    <div>Start</div>
                    <div>End</div>
                </div>
                <div className='data-container'>
                    {dsArray.map((ds) => (
                        <div className='row' key={ds.id}>
                            <div className='buttons'>
                                <input
                                    type='checkbox'
                                    checked={!!selectedDatasets[ds.id]}
                                    onChange={() => onToggleDataset(ds.id)}
                                />
                                <i className='fa fa-info-circle hitide-btn' aria-hidden='true'></i>
                            </div>
                            <div className='short-name'>{ds.shortName}</div>
                            <div>{ds.startDate ? new Date(ds.startDate).toLocaleDateString() : '--'}</div>
                            <div>{ds.endDate ? new Date(ds.endDate).toLocaleDateString() : 'Today'}</div>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
                .container {
                    height: 300px;
                    width: 100%;
                    border: 1px solid gray;
                    border-radius: 3px;
                    display: inline-flex;
                    flex-direction: column;
                }

                .header {
                    background-color: lightblue;
                    border-bottom: 1px solid gray;
                }

                .data-container {
                    overflow-y: scroll;
                }

                .row {
                    display: grid;
                    grid-template-columns: 4rem 1fr 6rem 6rem;
                }

                .row > div {
                    padding: 0.3rem 0.5rem;
                    word-break: break-all;
                }

                .buttons {
                    display: flex;
                    align-items: center;
                }

                .buttons > * {
                    margin-right: 0.5rem;
                }

                .hitide-btn {
                    color: rgb(96, 152, 204);
                    font-size: 1rem;
                }
            `}</style>
        </>
    );
}

function select(state) {
    return {
        datasets: selectDatasets(state),
        selectedDatasets: selectSelectedDatasets(state),
    };
}

const actions = {
    onToggleDataset: doToggleDataset,
};

export default connect(select, actions)(DatasetTable);
