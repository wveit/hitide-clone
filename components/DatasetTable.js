import { connect } from 'react-redux';
import { selectDatasets, selectSelectedDatasets } from '../state/datasetSearchSlice';
import { doFetchDatasets, doToggleDataset } from '../state/datasetActions';

export function DatasetTable({ datasets, selectedDatasets, onFetchDatasets, onToggleDataset }) {
    const dsArray = Object.values(datasets);
    return (
        <>
            <button onClick={onFetchDatasets}>Fetch Datasets</button>
            <p>Found {dsArray.length} datasets.</p>
            <div className='container'>
                <table>
                    <thead>
                        <tr>
                            <th> </th>
                            <th>Name</th>
                            <th>Start</th>
                            <th>End</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dsArray.map((ds) => (
                            <tr key={ds.id}>
                                <td>
                                    <input
                                        type='checkbox'
                                        checked={!!selectedDatasets[ds.id]}
                                        onChange={() => onToggleDataset(ds.id)}
                                    />
                                    <button>?</button>
                                </td>
                                <td>{ds.shortName}</td>
                                <td>{new Date(ds.startDate).toLocaleDateString()}</td>
                                <td>{ds.endDate ? new Date(ds.endDate).toLocaleDateString() : '--'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <style jsx>{`
                .container {
                    height: 300px;
                    overflow-y: scroll;
                    border: 1px solid gray;
                    display: inline flex;
                }

                th,
                td {
                    padding: 0.1rem 1rem;
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
    onFetchDatasets: doFetchDatasets,
    onToggleDataset: doToggleDataset,
};

export default connect(select, actions)(DatasetTable);
