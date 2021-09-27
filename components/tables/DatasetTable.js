import { connect } from 'react-redux';
import { selectDatasets, selectSelectedDatasets } from '../../state/datasetSearchSlice';
import { doToggleDataset } from '../../state/datasetActions';

export function DatasetTable({ datasets, selectedDatasets, onToggleDataset }) {
    const dsArray = Object.values(datasets);
    return (
        <>
            <p>Found {dsArray.length} datasets.</p>
            <div className='hitide-table'>
                <div className='hitide-table__row hitide-table__header'>
                    <div>Select</div>
                    <div>Name</div>
                    <div>Start</div>
                    <div>End</div>
                </div>
                {dsArray.map((ds) => (
                    <div className='hitide-table__row' key={ds.id}>
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

            <style jsx>{`
                .hitide-table {
                    height: 300px;
                }

                .hitide-table__header,
                .hitide-table__row {
                    display: grid;
                    grid-template-columns: 4rem 1fr 6rem 6rem;
                }

                .hitide-table__header > div,
                .hitide-table__row > div {
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
