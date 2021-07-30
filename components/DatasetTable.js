import { connect } from 'react-redux';
import { selectDatasets, selectSelectedDatasets } from '../state/datasetSearchSlice';
import { doToggleDataset } from '../state/datasetActions';

export function DatasetTable({ datasets, selectedDatasets, onFetchDatasets, onToggleDataset }) {
    const dsArray = Object.values(datasets);
    return (
        <>
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
                                    <i className='fa fa-info-circle hitide-btn' aria-hidden='true'></i>
                                </td>
                                <td className='short-name'>{ds.shortName}</td>
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
                    width: 100%;
                    overflow-y: scroll;
                    border: 1px solid gray;
                    display: inline flex;
                }

                .short-name {
                    width: auto;
                }

                th,
                td {
                    padding: 0.1rem 0.3rem;
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
