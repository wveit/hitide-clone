import { connect } from 'react-redux';
import {
    doSetCurrentGranuleFilter,
    selectCurrentGranuleFilter,
    selectGranuleFilters,
} from '../state/granuleSearchSlice';
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
    currentGranuleFilter,
    onGranuleFilterSelect,
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
                        <tr
                            key={filter.datasetId}
                            className={currentGranuleFilter === filter.datasetId ? 'selected' : ''}
                            onClick={() => onGranuleFilterSelect(filter.datasetId)}
                        >
                            <td>{datasets[filter.datasetId].shortName}</td>
                            <td>{datasetGranuleCounts[filter.datasetId]}</td>
                            <td>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onUnselectDataset(filter.datasetId);
                                    }}
                                >
                                    x
                                </button>
                            </td>
                            <td>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onDownloadAllGranulesForDataset(filter.datasetId);
                                    }}
                                >
                                    o
                                </button>
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

                .selected {
                    background-color: lightgray;
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
        currentGranuleFilter: selectCurrentGranuleFilter(state),
    };
}

const actions = {
    onUnselectDataset: doUnselectDatasetProcess,
    onUnselectAllDatasets: doUnselectAllDatasetsProcess,
    onGranuleFilterSelect: doSetCurrentGranuleFilter,
};

export default connect(select, actions)(GranuleSearchDatasetTable);
