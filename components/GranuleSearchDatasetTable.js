import { connect } from 'react-redux';
import { selectGranuleFilters } from '../state/granuleSearchSlice';
import { selectDatasets, selectDatasetGranuleCounts } from '../state/datasetSearchSlice';
import { doUnselectDatasetProcess, doUnselectAllDatasetsProcess } from '../state/datasetActions';

export function GranuleSearchDatasetTable({
    granuleFilters,
    datasets,
    datasetGranuleCounts,
    onUnselectDataset,
    onDownloadAllGranulesForDataset,
    onUnselectAllDatasets,
    onDownloadAllGranules,
}) {
    const granuleFilterArray = Object.values(granuleFilters);

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Granule Count</th>
                        <th>
                            <button onClick={onUnselectAllDatasets}>x</button>
                        </th>
                        <th>
                            <button onClick={onDownloadAllGranules}>o</button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {granuleFilterArray.map((filter) => (
                        <tr key={filter.datasetId}>
                            <td>{datasets[filter.datasetId].shortName}</td>
                            <td>{datasetGranuleCounts[filter.datasetId]}</td>
                            <td>
                                <button onClick={() => onUnselectDataset(filter.datasetId)}>x</button>
                            </td>
                            <td>
                                <button onClick={() => onDownloadAllGranulesForDataset(filter.datasetId)}>o</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <style jsx>{`
                th,
                td {
                    padding: 0.1rem 1rem;
                }
            `}</style>
        </div>
    );
}

function select(state) {
    return {
        granuleFilters: selectGranuleFilters(state),
        datasets: selectDatasets(state),
        datasetGranuleCounts: selectDatasetGranuleCounts(state),
    };
}

const actions = {
    onUnselectDataset: doUnselectDatasetProcess,
    onUnselectAllDatasets: doUnselectAllDatasetsProcess,
};

export default connect(select, actions)(GranuleSearchDatasetTable);
